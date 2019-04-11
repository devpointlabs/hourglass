import "./calendarPicker_DevpointColors.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Flatpickr from "flatpickr";
import { Button, Icon } from "semantic-ui-react";

const hooks = [
  "onChange",
  "onOpen",
  "onClose",
  "onMonthChange",
  "onYearChange",
  "onReady",
  "onValueUpdate",
  "onDayCreate"
];
const hookPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.func)
]);

class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    options: PropTypes.object,
    onChange: hookPropType,
    onOpen: hookPropType,
    onClose: hookPropType,
    onMonthChange: hookPropType,
    onYearChange: hookPropType,
    onReady: hookPropType,
    onValueUpdate: hookPropType,
    onDayCreate: hookPropType,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    options: {}
  };

  componentWillReceiveProps(props) {
    const { options } = props;
    const prevOptions = this.props.options;

    // Add prop hooks to options
    hooks.forEach(hook => {
      if (props.hasOwnProperty(hook)) {
        options[hook] = props[hook];
      }
      // Add prev ones too so we can compare against them later
      if (this.props.hasOwnProperty(hook)) {
        prevOptions[hook] = this.props[hook];
      }
    });

    const optionsKeys = Object.getOwnPropertyNames(options);

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index];
      let value = options[key];

      if (value !== prevOptions[key]) {
        // Hook handlers must be set as an array
        if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
          value = [value];
        }

        this.flatpickr.set(key, value);
      }
    }

    if (props.hasOwnProperty("value") && props.value !== this.props.value) {
      this.flatpickr.setDate(props.value, false);
    }
  }

  componentDidMount() {
    const options = {
      onClose: () => {
        this.node.blur && this.node.blur();
      },
      ...this.props.options
    };

    // Add prop hooks to options
    hooks.forEach(hook => {
      if (this.props[hook]) {
        options[hook] = this.props[hook];
      }
    });

    this.flatpickr = new Flatpickr(this.node, options);

    if (this.props.hasOwnProperty("value")) {
      this.flatpickr.setDate(this.props.value, false);
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  openFlatPickr = () => {
    this.flatpickr.open();
  };

  closeFlatPickr = () => {
    this.flatpickr.close();
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { options, defaultValue, value, children, ...props } = this.props;

    // Don't pass hooks to dom node
    hooks.forEach(hook => {
      delete props[hook];
    });

    return options.wrap ? (
      <div
        {...props}
        ref={node => {
          this.node = node;
        }}
      >
        {children}
      </div>
    ) : (
      <>
        <Button
          onClick={() => this.openFlatPickr()}
          name="calendar"
          style={{
            background: "white",
            border: "solid gray 1px",
            borderRadius: 0,
            padding: 0,
            margin: 0,
            height: "3em",
            width: "2.5em"
          }}
        >
          <Icon name="calendar alternate outline" style={{ margin: 0 }} />
          <div
            style={{
              background: "red",
              width: 0,
              overflow: "hidden",
              height: 0,
              padding: 0,
              margin: 0
            }}
          >
            <input
              {...props}
              defaultValue={defaultValue}
              ref={node => {
                this.node = node;
              }}
            />
          </div>
        </Button>
      </>
    );
  }
}

export default DateTimePicker;
