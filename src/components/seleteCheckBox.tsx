// import Multiselect from "multiselect-react-dropdown";

// // Define the prop types for SeleteCheckBox
// interface SeleteCheckBoxProps {
//   options: { name: string }[]; // Dropdown options passed as a prop
//   selectedValue: string[]; // Selected values passed as a prop
//   onSelect: (selected: string[]) => void; // Callback to handle selection
//   onRemove: (selected: string[]) => void; // Callback to handle removal
// }

// const SeleteCheckBox = ({
//   options,
//   selectedValue,
//   onSelect,
//   onRemove,
// }: SeleteCheckBoxProps) => {
//   const handleSelect = (selectedList: { name: string }[]) => {
//     const updatedSelectedValues = selectedList.map((item) => item.name);
//     onSelect(updatedSelectedValues); // Update selected values
//   };

//   const handleRemove = (selectedList: { name: string }[]) => {
//     const updatedSelectedValues = selectedList.map((item) => item.name);
//     onRemove(updatedSelectedValues); // Update removed values
//   };

//   return (
//     <div className="text-[14px]">
//       <Multiselect
//         options={options} // Options to display
//         selectedValues={options.filter((opt) =>
//           selectedValue.includes(opt.name)
//         )} // Preselected values
//         onSelect={handleSelect} // Triggered on selection
//         onRemove={handleRemove} // Triggered on removal
//         showCheckbox={true} // Enables checkboxes
//         displayValue="name" // Property to display
//       />
//     </div>
//   );
// };

// export default SeleteCheckBox;
