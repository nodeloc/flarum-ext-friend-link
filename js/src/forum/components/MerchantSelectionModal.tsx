// @ts-ignore
import app from 'flarum/common/app';
// @ts-ignore
import Button from 'flarum/common/components/Button';
// @ts-ignore
import classList from 'flarum/common/utils/classList';
// @ts-ignore
import extractText from 'flarum/common/utils/extractText';
// @ts-ignore
import highlight from 'flarum/common/helpers/highlight';
// @ts-ignore
import KeyboardNavigatable from 'flarum/common/utils/KeyboardNavigatable';
// @ts-ignore
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
// @ts-ignore
import Modal from 'flarum/common/components/Modal';
// @ts-ignore
import Stream from 'flarum/common/utils/Stream';
// @ts-ignore
import ToggleButton from 'flarum/common/components/ToggleButton';
import Merchant from '../model/Merchant'
// @ts-ignore
import type { IInternalModalAttrs } from 'flarum/common/components/Modal';
// @ts-ignore
import type Mithril from 'mithril';

export interface IMerchantSelectionModalLimits {
  /** Whether to allow bypassing the limits set here. This will show a toggle button to bypass limits. */
  allowBypassing?: boolean;
  /** Maximum number of primary/secondary merchants allowed. */
  max?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
  /** Minimum number of primary/secondary merchants to be selected. */
  min?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
}

export interface IMerchantSelectionModalAttrs extends IInternalModalAttrs {
  /** Custom modal className to use. */
  className?: string;
  /** Modal title, defaults to 'Choose Merchants'. */
  title?: string;
  /** Initial merchant selection value. */
  selectedMerchants?: Merchant[];
  /** Limits set based on minimum and maximum number of primary/secondary merchants that can be selected. */
  limits?: IMerchantSelectionModalLimits;
  /** Whether to allow resetting the value. Defaults to true. */
  allowResetting?: boolean;
  /** Whether to require the parent merchant of a selected merchant to be selected as well. */
  requireParentMerchant?: boolean;
  /** Filter merchants that can be selected. */
  selectableMerchants?: (merchants: Merchant[]) => Merchant[];
  /** Whether a merchant can be selected. */
  canSelect: (merchant: Merchant) => boolean;
  /** Callback for when a merchant is selected. */
  onSelect?: (merchant: Merchant, selected: Merchant[]) => void;
  /** Callback for when a merchant is deselected. */
  onDeselect?: (merchant: Merchant, selected: Merchant[]) => void;
  /** Callback for when the selection is submitted. */
  onsubmit?: (selected: Merchant[]) => void;
}

export type IMerchantSelectionModalState = undefined;

export default class MerchantSelectionModal<
  CustomAttrs extends IMerchantSelectionModalAttrs = IMerchantSelectionModalAttrs,
  CustomState extends IMerchantSelectionModalState = IMerchantSelectionModalState
> extends Modal<CustomAttrs, CustomState> {
  protected loading = true;
  protected merchants!: Merchant[];
  protected selected: Merchant[] = [];
  protected bypassReqs: boolean = false;

  protected filter = Stream('');
  protected focused = false;
  protected navigator = new KeyboardNavigatable();
  protected indexMerchant?: Merchant;

  static initAttrs(attrs: IMerchantSelectionModalAttrs) {
    super.initAttrs(attrs);

    // Default values for optional attributes.
    attrs.title ||= extractText(app.translator.trans('nodeloc-vps.forum.merchant_selection_modal.title'));
    attrs.canSelect ||= () => true;
    // Prevent illogical limits from being provided.
  }

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.navigator
      .onUp(() => this.setIndex(this.getCurrentNumericIndex() - 1, true))
      .onDown(() => this.setIndex(this.getCurrentNumericIndex() + 1, true))
      .onSelect(this.select.bind(this))
      .onRemove(() => this.selected.splice(this.selected.length - 1, 1));

    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/merchants',
    }).then(response => {
      this.merchants = response.data;
      this.merchants = response.data.map(item => ({
        id: item.id,
        merchant_name: item.attributes.merchant_name,
        merchant_intro: item.attributes.merchant_intro
      }));
      this.loading = false;
      if (this.attrs.selectableMerchants) {
        this.merchants = this.attrs.selectableMerchants(this.merchants);
      }

      if (this.attrs.selectedMerchants) {
        this.attrs.selectedMerchants.map(this.addMerchant.bind(this));
      }

      this.indexMerchant = this.merchants[0];
      m.redraw();
    });
  }

  className() {
    return classList('TagSelectionModal', this.attrs.className);
  }

  title() {
    return this.attrs.title;
  }

  content() {
    if (this.loading || !this.merchants) {
      return <LoadingIndicator />;
    }
    const filter = this.filter().toLowerCase();
    const merchants = this.getFilteredMerchants();
    return [
      <div className="Modal-body">
        <div className="TagSelectionModal-form">
          <div className="TagSelectionModal-form-input">
            <div className={'TagsInput FormControl ' + (this.focused ? 'focus' : '')} onclick={() => this.$('.TagsInput input').focus()}>
              <span className="TagsInput-selected">
                {this.selected.map((merchant) => (
                  <span
                    className="TagsInput-tag"
                    onclick={() => {
                      this.removeMerchant(merchant);
                      this.onready();
                    }}
                  >
                    <span class="TagLabel  colored text-contrast--dark" style="--tag-color: #2cb2b5;">
                      <span className="TagLabel-text">
                        <span className="TagLabel-name">{merchant.merchant_name}</span>
                      </span>
                    </span>
                  </span>
                ))}
              </span>
              <input
                className="FormControl"
                bidi={this.filter}
                onkeydown={this.navigator.navigate.bind(this.navigator)}
                onfocus={() => (this.focused = true)}
                onblur={() => (this.focused = false)}
              />
            </div>
          </div>
          <div className="TagSelectionModal-form-submit App-primaryControl">
            <Button
              type="submit"
              className="Button Button--primary"
              icon="fas fa-check"
            >
              {app.translator.trans('nodeloc-vps.forum.merchant_selection_modal.submit_button')}
            </Button>
          </div>
        </div>
      </div>,

      <div className="Modal-footer">
        <ul className="TagSelectionModal-list SelectTagList">
          {merchants.map((merchant) => (
            <li
              data-index={merchant.id}
              className={classList({
                pinned: true,
                selected: this.selected.includes(merchant),
                active: this.indexMerchant === merchant,
              })}
              onmouseover={() => (this.indexMerchant = merchant)}
              onclick={this.toggleMerchant.bind(this, merchant)}
            >
              <i class="icon fas fa-question-circle" style="--color: #be4b4b; color: rgb(190, 75, 75);"></i>
              <span className="SelectTagListItem-name">{merchant.merchant_name}</span>
              {merchant.merchant_intro ? <span className="SelectTagListItem-description">{merchant.merchant_intro}</span> : ''}
            </li>
          ))}
        </ul>
      </div>,
    ];
  }

  /**
   * Filters the available merchants on every state change.
   */
  private getFilteredMerchants(): Merchant[] {
    const filter = this.filter().toLowerCase();
    let merchants = this.merchants;
    // If the user has entered text in the filter input, then filter by merchants
    // whose name matches what they've entered.
    if (filter) {
      merchants = merchants.filter((merchant) => merchant.merchant_name.toLowerCase().includes(filter));
    }

    if (!this.indexMerchant || !merchants.includes(this.indexMerchant)) this.indexMerchant = merchants[0];

    return merchants;
  }



  /**
   * Validates the number of selected primary/secondary merchants against the set min max limits.
   */
  protected meetsRequirements(primaryCount: number, secondaryCount: number) {
    if (this.selected.length < 1) {
      return false;
    }else{
      return true;
    }
  }

  /**
   * Add the given merchant to the list of selected merchants.
   */
  protected addMerchant(merchant: Merchant | undefined) {
    if (!merchant || !this.attrs.canSelect(merchant)) return;

    if (this.attrs.onSelect) {
      this.attrs.onSelect(merchant, this.selected);
    }

    // If this merchant has a parent, we'll also need to add the parent merchant to the
    // selected list if it's not already in there.
    if (this.attrs.requireParentMerchant) {
      const parent = merchant.parent();
      if (parent && !this.selected.includes(parent)) {
        this.selected.push(parent);
      }
    }

    if (!this.selected.includes(merchant)) {
      this.selected.push(merchant);
    }
  }

  /**
   * Remove the given merchant from the list of selected merchants.
   */
  protected removeMerchant(merchant: Merchant) {
    const index = this.selected.indexOf(merchant);

    if (index !== -1) {
      this.selected.splice(index, 1);

      // Look through the list of selected merchants for any merchants which have the merchant
      // we just removed as their parent. We'll need to remove them too.
      if (this.attrs.requireParentMerchant) {
        this.selected.filter((t) => t.parent() === merchant).forEach(this.removeMerchant.bind(this));
      }

      if (this.attrs.onDeselect) {
        this.attrs.onDeselect(merchant, this.selected);
      }
    }
  }

  protected toggleMerchant(merchant: Merchant) {
    // Won't happen, needed for type safety.
    if (!this.merchants) return;

    if (this.selected.includes(merchant)) {
      this.removeMerchant(merchant);
    } else {
      this.addMerchant(merchant);
    }

    if (this.filter()) {
      this.filter('');
      this.indexMerchant = this.merchants[0];
    }

    this.onready();
  }

  /**
   * Gives human text instructions based on the current number of selected merchants and set limits.
   */
  protected getInstruction(primaryCount: number, secondaryCount: number) {
    if (this.bypassReqs) {
      return '';
    }

    if (primaryCount < this.attrs.limits!.min!.primary!) {
      const remaining = this.attrs.limits!.min!.primary! - primaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.merchant_selection_modal.choose_primary_placeholder', { count: remaining }));
    } else if (secondaryCount < this.attrs.limits!.min!.secondary!) {
      const remaining = this.attrs.limits!.min!.secondary! - secondaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.merchant_selection_modal.choose_secondary_placeholder', { count: remaining }));
    } else if (this.selected.length < this.attrs.limits!.min!.total!) {
      const remaining = this.attrs.limits!.min!.total! - this.selected.length;
      return extractText(app.translator.trans('nodeloc-vps.forum.merchant_selection_modal.choose_merchants_placeholder', { count: remaining }));
    }

    return '';
  }

  /**
   * Submit merchant selection.
   */
  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    if (this.attrs.onsubmit) this.attrs.onsubmit(this.selected);

    app.modal.close();
  }

  protected select(e: KeyboardEvent) {
    // Ctrl + Enter submits the selection, just Enter completes the current entry
    if (e.metaKey || e.ctrlKey || (this.indexMerchant && this.selected.includes(this.indexMerchant))) {
      if (this.selected.length) {
        // The DOM submit method doesn't emit a `submit event, so we
        // simulate a manual submission so our `onsubmit` logic is run.
        this.$('button[type="submit"]').click();
      }
    } else if (this.indexMerchant) {
      this.getItem(this.indexMerchant)[0].dispatchEvent(new Event('click'));
    }
  }

  protected selectableItems() {
    return this.$('.MerchantSelectionModal-list > li');
  }

  protected getCurrentNumericIndex() {
    if (!this.indexMerchant) return -1;

    return this.selectableItems().index(this.getItem(this.indexMerchant));
  }

  protected getItem(selectedMerchant: Merchant) {
    return this.selectableItems().filter(`[data-index="${selectedMerchant.id()}"]`);
  }

  protected setIndex(index: number, scrollToItem: boolean) {
    const $items = this.selectableItems();
    const $dropdown = $items.parent();

    if (index < 0) {
      index = $items.length - 1;
    } else if (index >= $items.length) {
      index = 0;
    }

    const $item = $items.eq(index);

    this.indexMerchant = app.store.getById('merchants', $item.attr('data-index')!);

    m.redraw();

    if (scrollToItem && this.indexMerchant) {
      const dropdownScroll = $dropdown.scrollTop()!;
      const dropdownTop = $dropdown.offset()!.top;
      const dropdownBottom = dropdownTop + $dropdown.outerHeight()!;
      const itemTop = $item.offset()!.top;
      const itemBottom = itemTop + $item.outerHeight()!;

      let scrollTop;
      if (itemTop < dropdownTop) {
        scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
      } else if (itemBottom > dropdownBottom) {
        scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
      }

      if (typeof scrollTop !== 'undefined') {
        $dropdown.stop(true).animate({ scrollTop }, 100);
      }
    }
  }
}
