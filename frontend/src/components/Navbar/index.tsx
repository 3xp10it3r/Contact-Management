import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentModal,
  setSearchString,
} from "../../redux/features/common/commonSlice";
import { CurrentModalEnum } from "../../utils/constants";

const Navbar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString({ searchString: inputValue }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  return (
    <div className="flex w-full items-center justify-between px-5 py-2 bg-gradient-to-r from-primary-800 to-primary-500 ">
      <Text c={"white"} weight={700} size={20}>
        Contact Management
      </Text>
      <div className="flex justify-end gap-2">
        <TextInput
          placeholder="Search"
          icon={<IconSearch size="1rem" stroke={2} />}
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="outline"
          className="bg-white text-primary-800 hover:bg-gray-100"
          onClick={() =>
            dispatch(setCurrentModal({ modalName: CurrentModalEnum.ADD }))
          }
        >
          <Text weight={700} className="flex items-center gap-1">
            <span className="text-lg">+</span> Add
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
