import { useEffect } from "react";
import ContactTable from "../ContactTable";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { fetchContacts } from "../../redux/features/contacts/contactsSlice";
import ContactModal from "../Modals/ContactModal";
import { CurrentModalEnum } from "../../utils/constants";
const MainLayout = () => {
  const { data, status } = useSelector((state: RootState) => state.contacts);
  const { currentModal, currentId } = useSelector(
    (state: RootState) => state.common
  );

  useEffect(() => {
    if (status === "idle") {
      store.dispatch(fetchContacts());
    }
  }, [status]);
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <ContactTable data={data} />
      {currentModal === CurrentModalEnum.ADD && (
        <ContactModal title={"Add"} contactDetails={null} />
      )}
      {currentModal === CurrentModalEnum.EDIT && (
        <ContactModal
          title={"Edit"}
          contactDetails={data.find((d) => d.id === currentId) || null}
        />
      )}
    </div>
  );
};

export default MainLayout;
