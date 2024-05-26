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
import Location from '../model/Location'
// @ts-ignore
import type { IInternalModalAttrs } from 'flarum/common/components/Modal';
// @ts-ignore
import type Mithril from 'mithril';

export interface ILocationSelectionModalLimits {
  /** Whether to allow bypassing the limits set here. This will show a toggle button to bypass limits. */
  allowBypassing?: boolean;
  /** Maximum number of primary/secondary locations allowed. */
  max?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
  /** Minimum number of primary/secondary locations to be selected. */
  min?: {
    total?: number;
    primary?: number;
    secondary?: number;
  };
}

export interface ILocationSelectionModalAttrs extends IInternalModalAttrs {
  /** Custom modal className to use. */
  className?: string;
  /** Modal title, defaults to 'Choose Locations'. */
  title?: string;
  /** Initial location selection value. */
  selectedLocations?: Location[];
  /** Limits set based on minimum and maximum number of primary/secondary locations that can be selected. */
  limits?: ILocationSelectionModalLimits;
  /** Whether to allow resetting the value. Defaults to true. */
  allowResetting?: boolean;
  /** Whether to require the parent location of a selected location to be selected as well. */
  requireParentLocation?: boolean;
  /** Filter locations that can be selected. */
  selectableLocations?: (locations: Location[]) => Location[];
  /** Whether a location can be selected. */
  canSelect: (location: Location) => boolean;
  /** Callback for when a location is selected. */
  onSelect?: (location: Location, selected: Location[]) => void;
  /** Callback for when a location is deselected. */
  onDeselect?: (location: Location, selected: Location[]) => void;
  /** Callback for when the selection is submitted. */
  onsubmit?: (selected: Location[]) => void;
}

export type ILocationSelectionModalState = undefined;

export default class LocationSelectionModal<
  CustomAttrs extends ILocationSelectionModalAttrs = ILocationSelectionModalAttrs,
  CustomState extends ILocationSelectionModalState = ILocationSelectionModalState
> extends Modal<CustomAttrs, CustomState> {
  protected loading = true;
  protected locations!: Location[];
  protected selected: Location[] = [];
  protected bypassReqs: boolean = false;

  protected filter = Stream('');
  protected focused = false;
  protected navigator = new KeyboardNavigatable();
  protected indexLocation?: Location;

  static initAttrs(attrs: ILocationSelectionModalAttrs) {
    super.initAttrs(attrs);

    // Default values for optional attributes.
    attrs.title ||= extractText(app.translator.trans('nodeloc-vps.forum.location_selection_modal.title'));
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
      url: app.forum.attribute('apiUrl') + '/locations',
    }).then(response => {
      this.locations = response.data;
      this.locations = response.data.map(item => ({
        id: item.id,
        location_name: item.attributes.location_name,
        location_intro: item.attributes.location_intro
      }));
      this.loading = false;
      if (this.attrs.selectableLocations) {
        this.locations = this.attrs.selectableLocations(this.locations);
      }

      if (this.attrs.selectedLocations) {
        this.attrs.selectedLocations.map(this.addLocation.bind(this));
      }

      this.indexLocation = this.locations[0];
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
    if (this.loading || !this.locations) {
      return <LoadingIndicator />;
    }
    const filter = this.filter().toLowerCase();
    const locations = this.getFilteredLocations();
    return [
      <div className="Modal-body">
        <div className="TagSelectionModal-form">
          <div className="TagSelectionModal-form-input">
            <div className={'TagsInput FormControl ' + (this.focused ? 'focus' : '')} onclick={() => this.$('.TagsInput input').focus()}>
              <span className="TagsInput-selected">
                {this.selected.map((location) => (
                  <span
                    className="TagsInput-tag"
                    onclick={() => {
                      this.removeLocation(location);
                      this.onready();
                    }}
                  >
                    <span class="TagLabel  colored text-contrast--dark" style="--tag-color: #2cb2b5;">
                      <span className="TagLabel-text">
                        <span className="TagLabel-name">{location.location_name}</span>
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
              {app.translator.trans('nodeloc-vps.forum.location_selection_modal.submit_button')}
            </Button>
          </div>
        </div>
      </div>,

      <div className="Modal-footer">
        <ul className="TagSelectionModal-list SelectTagList">
          {locations.map((location) => (
            <li
              data-index={location.id}
              className={classList({
                pinned: true,
                selected: this.selected.includes(location),
                active: this.indexLocation === location,
              })}
              onmouseover={() => (this.indexLocation = location)}
              onclick={this.toggleLocation.bind(this, location)}
            >
              <i class="icon fas fa-question-circle" style="--color: #be4b4b; color: rgb(190, 75, 75);"></i>
              <span className="SelectTagListItem-name">{location.location_name}</span>
              {location.location_intro ? <span className="SelectTagListItem-description">{location.location_intro}</span> : ''}
            </li>
          ))}
        </ul>
      </div>,
    ];
  }

  /**
   * Filters the available locations on every state change.
   */
  private getFilteredLocations(): Location[] {
    const filter = this.filter().toLowerCase();
    let locations = this.locations;
    // If the user has entered text in the filter input, then filter by locations
    // whose name matches what they've entered.
    if (filter) {
      locations = locations.filter((location) => location.location_name.toLowerCase().includes(filter));
    }

    if (!this.indexLocation || !locations.includes(this.indexLocation)) this.indexLocation = locations[0];

    return locations;
  }



  /**
   * Validates the number of selected primary/secondary locations against the set min max limits.
   */
  protected meetsRequirements(primaryCount: number, secondaryCount: number) {
    if (this.selected.length < 1) {
      return false;
    }else{
      return true;
    }
  }

  /**
   * Add the given location to the list of selected locations.
   */
  protected addLocation(location: Location | undefined) {
    if (!location || !this.attrs.canSelect(location)) return;

    if (this.attrs.onSelect) {
      this.attrs.onSelect(location, this.selected);
    }

    // If this location has a parent, we'll also need to add the parent location to the
    // selected list if it's not already in there.
    if (this.attrs.requireParentLocation) {
      const parent = location.parent();
      if (parent && !this.selected.includes(parent)) {
        this.selected.push(parent);
      }
    }

    if (!this.selected.includes(location)) {
      this.selected.push(location);
    }
  }

  /**
   * Remove the given location from the list of selected locations.
   */
  protected removeLocation(location: Location) {
    const index = this.selected.indexOf(location);

    if (index !== -1) {
      this.selected.splice(index, 1);

      // Look through the list of selected locations for any locations which have the location
      // we just removed as their parent. We'll need to remove them too.
      if (this.attrs.requireParentLocation) {
        this.selected.filter((t) => t.parent() === location).forEach(this.removeLocation.bind(this));
      }

      if (this.attrs.onDeselect) {
        this.attrs.onDeselect(location, this.selected);
      }
    }
  }

  protected toggleLocation(location: Location) {
    // Won't happen, needed for type safety.
    if (!this.locations) return;

    if (this.selected.includes(location)) {
      this.removeLocation(location);
    } else {
      this.addLocation(location);
    }

    if (this.filter()) {
      this.filter('');
      this.indexLocation = this.locations[0];
    }

    this.onready();
  }

  /**
   * Gives human text instructions based on the current number of selected locations and set limits.
   */
  protected getInstruction(primaryCount: number, secondaryCount: number) {
    if (this.bypassReqs) {
      return '';
    }

    if (primaryCount < this.attrs.limits!.min!.primary!) {
      const remaining = this.attrs.limits!.min!.primary! - primaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.location_selection_modal.choose_primary_placeholder', { count: remaining }));
    } else if (secondaryCount < this.attrs.limits!.min!.secondary!) {
      const remaining = this.attrs.limits!.min!.secondary! - secondaryCount;
      return extractText(app.translator.trans('nodeloc-vps.forum.location_selection_modal.choose_secondary_placeholder', { count: remaining }));
    } else if (this.selected.length < this.attrs.limits!.min!.total!) {
      const remaining = this.attrs.limits!.min!.total! - this.selected.length;
      return extractText(app.translator.trans('nodeloc-vps.forum.location_selection_modal.choose_locations_placeholder', { count: remaining }));
    }

    return '';
  }

  /**
   * Submit location selection.
   */
  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    if (this.attrs.onsubmit) this.attrs.onsubmit(this.selected);

    app.modal.close();
  }

  protected select(e: KeyboardEvent) {
    // Ctrl + Enter submits the selection, just Enter completes the current entry
    if (e.metaKey || e.ctrlKey || (this.indexLocation && this.selected.includes(this.indexLocation))) {
      if (this.selected.length) {
        // The DOM submit method doesn't emit a `submit event, so we
        // simulate a manual submission so our `onsubmit` logic is run.
        this.$('button[type="submit"]').click();
      }
    } else if (this.indexLocation) {
      this.getItem(this.indexLocation)[0].dispatchEvent(new Event('click'));
    }
  }

  protected selectableItems() {
    return this.$('.LocationSelectionModal-list > li');
  }

  protected getCurrentNumericIndex() {
    if (!this.indexLocation) return -1;

    return this.selectableItems().index(this.getItem(this.indexLocation));
  }

  protected getItem(selectedLocation: Location) {
    return this.selectableItems().filter(`[data-index="${selectedLocation.id()}"]`);
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

    this.indexLocation = app.store.getById('locations', $item.attr('data-index')!);

    m.redraw();

    if (scrollToItem && this.indexLocation) {
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
