import { useEffect, useState } from "react";
import { Table, Text } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { Th } from "./TableHeading";
import { setCurrentModal } from "../../redux/features/common/commonSlice";
import { CurrentModalEnum } from "../../utils/constants";
import { deleteContact } from "../../redux/features/contacts/contactsSlice";
import { toast } from "react-toastify";

interface RowData {
  name: string;
  email: string;
  phone: string;
  id: string;
  created_at: string;
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.length
    ? data?.filter((item) => item.name.toLowerCase().includes(query))
    : [];
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data]?.sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const ContactTable = ({ data }: { data: RowData[] }) => {
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { search } = useSelector((state: RootState) => state.common);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    data.length &&
      setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  useEffect(() => {
    data.length &&
      setSortedData(
        sortData(data, {
          sortBy,
          reversed: reverseSortDirection,
          search: search,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const rows = sortedData?.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.phone}</td>
      <td>{row.created_at}</td>
      <td className="flex gap-4">
        <IconPencil
          size={"1.2rem"}
          stroke={2}
          cursor={"pointer"}
          onClick={() => {
            dispatch(
              setCurrentModal({
                modalName: CurrentModalEnum.EDIT,
                currentId: row.id,
              })
            );
          }}
        />
        <IconX
          color="red"
          size={"1.2rem"}
          stroke={3}
          cursor={"pointer"}
          onClick={() =>
            store
              .dispatch(deleteContact(row.id))
              .then(() => toast("Contact Deleted Succeessfully!"))
          }
        />
      </td>
    </tr>
  ));

  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="xs"
      sx={{ tableLayout: "fixed" }}
      className="h-full"
      highlightOnHover
      striped
    >
      <thead className="bg-gradient-to-b from-primary-400 to-primary-600">
        <tr>
          <Th
            sorted={sortBy === "name"}
            reversed={reverseSortDirection}
            onSort={() => setSorting("name")}
          >
            <Text c={"white"}>Name</Text>
          </Th>
          <Th
            sorted={sortBy === "email"}
            reversed={reverseSortDirection}
            onSort={() => setSorting("email")}
          >
            <Text c={"white"}>Email</Text>
          </Th>
          <Th
            sorted={sortBy === "phone"}
            reversed={reverseSortDirection}
            onSort={() => setSorting("phone")}
          >
            <Text c={"white"}>Mobile No.</Text>
          </Th>
          <Th
            sorted={sortBy === "created_at"}
            reversed={reverseSortDirection}
            onSort={() => setSorting("created_at")}
          >
            <Text c={"white"}>Created At</Text>
          </Th>
          <Th title={false}>
            <Text c={"white"}>Actions</Text>
          </Th>
        </tr>
      </thead>
      <tbody>
        {rows?.length > 0 ? (
          rows
        ) : (
          <tr>
            <td colSpan={Object.keys(data?.[0] || []).length}>
              <Text weight={500} align="center">
                No Record Found!
              </Text>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ContactTable;
