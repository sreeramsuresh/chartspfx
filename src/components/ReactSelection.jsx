import React from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ReactSelection extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;

    const Option = (props) => {
      return (
        <div>
          <components.Option {...props}>
            <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => null}
            />{" "}
            <label>{props.label}</label>
          </components.Option>
        </div>
      );
    };

    const MultiValue = (props) => (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );

    const animatedComponents = makeAnimated();

    return (
      <Select
        value={selectedOption}
        wi
        onChange={this.handleChange}
        components={{ Option, MultiValue, animatedComponents }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={options}
        isMulti={true}
        placeholder="All"
        color="white"
        theme={(theme) => ({
          ...theme,
          borderColor: "yellow",
          borderRadius: 0,
          colors: {
            primary75: "#838b96",
            primary50: "#838b96",
            primary25: "#737d8c",
            primary: "#5A5A5A",
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "3px solid yellow",
            borderColor: "yellow",
            backgroundColor: "#5A5A5A",
          }),
        }}
      />
    );
  }
}
export default ReactSelection;
