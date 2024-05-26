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
import VpsTags from '../model/VpsTag'
// @ts-ignore
import type { IInternalModalAttrs } from 'flarum/common/components/Modal';
// @ts-ignore
import type Mithril from 'mithril';

export interface IVpsTagsSelectionModalLimits {
  /** Whether to allow bypassing the limits set here. This will show a toggle button to bypass limits. */
  allowBypassing?: boolean;
  /** Maximum number of primary/secondary vpstags allowed. */
  max?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
  /** Minimum number of primary/secondary vpstags to be selected. */
  min?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
}

export interface IVpsTagsSelectionModalAttrs extends IInternalModalAttrs {
  /** Custom modal className to use. */
  className?: string;
  /** Modal title, defaults to 'Choose VpsTags'. */
  title?: string;
  /** Initial vpstag selection value. */
  selectedVpsTags?: VpsTags[];
  /** Limits set based on minimum and maximum number of primary/secondary vpstags that can be selected. */
  limits?: IVpsTagsSelectionModalLimits;
  /** Whether to allow resetting the value. Defaults to true. */
  allowResetting?: boolean;
  /** Whether to require the parent vpstag of a selected vpstag to be selected as well. */
  requireParentVpsTags?: boolean;
  /** Filter vpstags that can be selected. */
  selectableVpsTags?: (vpstags: VpsTags[]) => VpsTags[];
  /** Whether a vpstag can be selected. */
  canSelect: (vpstag: VpsTags) => boolean;
  /** Callback for when a vpstag is selected. */
  onSelect?: (vpstag: VpsTags, selected: VpsTags[]) => void;
  /** Callback for when a vpstag is deselected. */
  onDeselect?: (vpstag: VpsTags, selected: VpsTags[]) => void;
  /** Callback for when the selection is submitted. */
  onsubmit?: (selected: VpsTags[]) => void;
}

export type IVpsTagsSelectionModalState = undefined;

export default class VpsTagsSelectionModal<
  CustomAttrs extends IVpsTagsSelectionModalAttrs = IVpsTagsSelectionModalAttrs,
  CustomState extends IVpsTagsSelectionModalState = IVpsTagsSelectionModalState
> extends Modal<CustomAttrs, CustomState> {
  protected loading = true;
  protected vpstags!: VpsTags[];
  protected selected: VpsTags[] = [];
  protected bypassReqs: boolean = false;

  protected filter = Stream('');
  protected focused = false;
  protected navigator = new KeyboardNavigatable();
  protected indexVpsTags?: VpsTags;

  static initAttrs(attrs: IVpsTagsSelectionModalAttrs) {
    super.initAttrs(attrs);

    // Default values for optional attributes.
    attrs.title ||= extractText(app.translator.trans('nodeloc-vps.forum.vpstag_selection_modal.title'));
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
      url: app.forum.attribute('apiUrl') + '/vpstags',
    }).then(response => {
      this.vpstags = response.data;
      this.vpstags = response.data.map(item => ({
        id: item.id,
        tag_name: item.attributes.tag_name
      }));
      this.loading = false;
      if (this.attrs.selectableVpsTags) {
        this.vpstags = this.attrs.selectableVpsTags(this.vpstags);
      }

      if (this.attrs.selectedVpsTags) {
        this.attrs.selectedVpsTags.map(this.addVpsTags.bind(this));
      }

      this.indexVpsTags = this.vpstags[0];
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
    if (this.loading || !this.vpstags) {
      return <LoadingIndicator />;
    }
    const filter = this.filter().toLowerCase();
    const vpstags = this.getFilteredVpsTags();
    return [
      <div className="Modal-body">
        <div className="TagSelectionModal-form">
          <div className="TagSelectionModal-form-input">
            <div className={'TagsInput FormControl ' + (this.focused ? 'focus' : '')} onclick={() => this.$('.TagsInput input').focus()}>
              <span className="TagsInput-selected">
                {this.selected.map((vpstag) => (
                  <span
                    className="TagsInput-tag"
                    onclick={() => {
                      this.removeVpsTags(vpstag);
                      this.onready();
                    }}
                  >
                    <span class="TagLabel  colored text-contrast--dark" style="--tag-color: #2cb2b5;">
                      <span className="TagLabel-text">
                        <span className="TagLabel-name">{vpstag.tag_name}</span>
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
              {app.translator.trans('nodeloc-vps.forum.vpstag_selection_modal.submit_button')}
            </Button>
          </div>
        </div>
      </div>,

      <div className="Modal-footer">
        <ul className="TagSelectionModal-list SelectTagList">
          {vpstags.map((vpstag) => (
            <li
              data-index={vpstag.id}
              className={classList({
                pinned: true,
                selected: this.selected.includes(vpstag),
                active: this.indexVpsTags === vpstag,
              })}
              onmouseover={() => (this.indexVpsTags = vpstag)}
              onclick={this.toggleVpsTags.bind(this, vpstag)}
            >
              <i class="icon fas fa-question-circle" style="--color: #be4b4b; color: rgb(190, 75, 75);"></i>
              <span className="SelectTagListItem-name">{vpstag.tag_name}</span>
              {vpstag.tag_intro ? <span className="SelectTagListItem-description">{vpstag.tag_intro}</span> : ''}
            </li>
          ))}
        </ul>
      </div>,
    ];
  }

  /**
   * Filters the available vpstags on every state change.
   */
  private getFilteredVpsTags(): VpsTags[] {
    const filter = this.filter().toLowerCase();
    let vpstags = this.vpstags;
    // If the user has entered text in the filter input, then filter by vpstags
    // whose name matches what they've entered.
    if (filter) {
      vpstags = vpstags.filter((vpstag) => vpstag.tag_name.toLowerCase().includes(filter));
    }

    if (!this.indexVpsTags || !vpstags.includes(this.indexVpsTags)) this.indexVpsTags = vpstags[0];

    return vpstags;
  }



  /**
   * Validates the number of selected primary/secondary vpstags against the set min max limits.
   */
  protected meetsRequirements(primaryCount: number, secondaryCount: number) {
    if (this.selected.length < 1) {
      return false;
    }else{
      return true;
    }
  }

  /**
   * Add the given vpstag to the list of selected vpstags.
   */
  protected addVpsTags(vpstag: VpsTags | undefined) {
    if (!vpstag || !this.attrs.canSelect(vpstag)) return;

    if (this.attrs.onSelect) {
      this.attrs.onSelect(vpstag, this.selected);
    }

    // If this vpstag has a parent, we'll also need to add the parent vpstag to the
    // selected list if it's not already in there.
    if (this.attrs.requireParentVpsTags) {
      const parent = vpstag.parent();
      if (parent && !this.selected.includes(parent)) {
        this.selected.push(parent);
      }
    }

    if (!this.selected.includes(vpstag)) {
      this.selected.push(vpstag);
    }
  }

  /**
   * Remove the given vpstag from the list of selected vpstags.
   */
  protected removeVpsTags(vpstag: VpsTags) {
    const index = this.selected.indexOf(vpstag);

    if (index !== -1) {
      this.selected.splice(index, 1);

      // Look through the list of selected vpstags for any vpstags which have the vpstag
      // we just removed as their parent. We'll need to remove them too.
      if (this.attrs.requireParentVpsTags) {
        this.selected.filter((t) => t.parent() === vpstag).forEach(this.removeVpsTags.bind(this));
      }

      if (this.attrs.onDeselect) {
        this.attrs.onDeselect(vpstag, this.selected);
      }
    }
  }

  protected toggleVpsTags(vpstag: VpsTags) {
    // Won't happen, needed for type safety.
    if (!this.vpstags) return;

    if (this.selected.includes(vpstag)) {
      this.removeVpsTags(vpstag);
    } else {
      this.addVpsTags(vpstag);
    }

    if (this.filter()) {
      this.filter('');
      this.indexVpsTags = this.vpstags[0];
    }

    this.onready();
  }

  /**
   * Gives human text instructions based on the current number of selected vpstags and set limits.
   */
  protected getInstruction(primaryCount: number, secondaryCount: number) {
    if (this.bypassReqs) {
      return '';
    }

    if (primaryCount < this.attrs.limits!.min!.primary!) {
      const remaining = this.attrs.limits!.min!.primary! - primaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.vpstag_selection_modal.choose_primary_placeholder', { count: remaining }));
    } else if (secondaryCount < this.attrs.limits!.min!.secondary!) {
      const remaining = this.attrs.limits!.min!.secondary! - secondaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.vpstag_selection_modal.choose_secondary_placeholder', { count: remaining }));
    } else if (this.selected.length < this.attrs.limits!.min!.total!) {
      const remaining = this.attrs.limits!.min!.total! - this.selected.length;
      return extractText(app.translator.trans('nodeloc-vps.forum.vpstag_selection_modal.choose_vpstags_placeholder', { count: remaining }));
    }

    return '';
  }

  /**
   * Submit vpstag selection.
   */
  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    if (this.attrs.onsubmit) this.attrs.onsubmit(this.selected);

    app.modal.close();
  }

  protected select(e: KeyboardEvent) {
    // Ctrl + Enter submits the selection, just Enter completes the current entry
    if (e.metaKey || e.ctrlKey || (this.indexVpsTags && this.selected.includes(this.indexVpsTags))) {
      if (this.selected.length) {
        // The DOM submit method doesn't emit a `submit event, so we
        // simulate a manual submission so our `onsubmit` logic is run.
        this.$('button[type="submit"]').click();
      }
    } else if (this.indexVpsTags) {
      this.getItem(this.indexVpsTags)[0].dispatchEvent(new Event('click'));
    }
  }

  protected selectableItems() {
    return this.$('.VpsTagsSelectionModal-list > li');
  }

  protected getCurrentNumericIndex() {
    if (!this.indexVpsTags) return -1;

    return this.selectableItems().index(this.getItem(this.indexVpsTags));
  }

  protected getItem(selectedVpsTags: VpsTags) {
    return this.selectableItems().filter(`[data-index="${selectedVpsTags.id()}"]`);
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

    this.indexVpsTags = app.store.getById('vpstags', $item.attr('data-index')!);

    m.redraw();

    if (scrollToItem && this.indexVpsTags) {
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
