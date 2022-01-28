import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

function SelectComponent() {
  const [bank, setBank] = useState(null);
  const [branch, setBranch] = useState(null);

  const [bankList, setBankList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  const [bankOption, setBankOption] = useState([]);
  const [branchOption, setBranchOption] = useState([]);
  const [branchValue,setBranchValue] = useState()


  useEffect(() => {
    getBankList();
    getBranchList(bank);
  }, [bank]);

  const getBankList = async () => {
    try {
      const response = await fetch("http://localhost:5000/banks");
      const data = await response.json();
      const values = data.map((bank) => ({
        value: bank.bank_name,
        label: `${bank.bank_name} - (${bank.bank_code})`,
      }));
      setBankList(data);
      setBankOption(values);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBranchList = async (bank) => {
    try {
      if (bank.bank_code === 0) {
        return;
      }
      const code = bank.bank_code;
      console.log(code);
      const response = await fetch(`http://localhost:5000/banks/${code}`);
      const data = await response.json();
      const values = data.map((branch) => ({
        value: branch.branch_location,
        label: `${branch.branch_location} - (${branch.branch_code})`,
      }));

      setBranchList(data);
      setBranchOption(values);
    } catch (err) {
      console.error(err.message);
    }
  };

  const selectBank = (bank) => {
    let result = bankList.filter((item) => item.bank_name === bank);
    console.log(result);
    setBank(result[0]);
  };

  const selectBranch = (branch) => {
    let result = branchList.filter((item) => item.branch_location === branch);
    console.log(result);
    setBranch(result[0]);
  };

  const handleSelectBank = (e) => {
    console.log(e.value);
    selectBank(e.value);
    setBranchValue(null)
    selectBranch(null)
  };

  const handleSelectBranch = (e) => {
    //console.log(e.target.value);
    selectBranch(e.value);
    setBranchValue(e)
  };

  return (
    <div className='container'>
      <Select
        className='my-3'
        options={bankOption}
        onChange={handleSelectBank}
      />
      <Select
        value={branchValue}
        className='my-3'
        options={branchOption}
        onChange={handleSelectBranch}
      />
    </div>
  );
}
export default SelectComponent;
