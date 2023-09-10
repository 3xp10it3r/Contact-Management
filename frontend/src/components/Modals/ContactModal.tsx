import { Button, Divider, Modal, Select, Text, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setCurrentModal } from "../../redux/features/common/commonSlice";
import { IconXboxX } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { IndianFlagIcon } from "../../assets/icons";
import { RowData } from "../../utils/types";
import { schema } from "./validationSchema";
import {
  addContact,
  editContact,
} from "../../redux/features/contacts/contactsSlice";
import { store } from "../../redux/store";
import { toast } from "react-toastify";

const ContactModal = ({
  title,
  contactDetails,
}: {
  title: string;
  contactDetails: RowData | null;
}) => {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: contactDetails?.name || "",
      email: contactDetails?.email || "",
      code: "+91",
      phone: contactDetails?.phone || "",
    },
    validate: zodResolver(schema),
  });

  const close = () => {
    dispatch(setCurrentModal({ modalName: null }));
  };

  const onSubmitHandler = (values: {
    name: string;
    email: string;
    phone: string;
    code: string;
  }) => {
    const v: RowData = {
      name: values?.name || "",
      email: values?.email || "",
      phone: values?.phone.toString() || "",
    };
    if (title === "Add") {
      store
        .dispatch(addContact(v))
        .then(() => toast("Contact Added Successfully"))
        .then(() => dispatch(setCurrentModal({ modalName: null })))
        .catch((err) => toast(err));
    } else {
      v.id = contactDetails?.id;
      store
        .dispatch(editContact(v))
        .then(() => toast("Contact Edited Successfully"))
        .then(() => dispatch(setCurrentModal({ modalName: null })))
        .catch((err) => toast(err));
    }
  };

  return (
    <>
      <Modal
        opened={true}
        onClose={close}
        centered
        size="auto"
        withCloseButton={false}
        padding={0}
        radius={12}
        trapFocus={false}
      >
        <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
          <div className="flex h-[70vh] w-[50vw] flex-col rounded-xl bg-white 2xl:h-[50vh] 2xl:w-[40vw]">
            <div>
              <div className="flex h-16 w-full items-center justify-between p-3">
                <Text size={16} weight={700}>
                  {title} Contact
                </Text>
                <IconXboxX onClick={close} cursor={"pointer"} />
              </div>
              <Divider color="neutral.2" />
            </div>
            <div className="mx-auto flex w-[60%] flex-col p-6 gap-5">
              <TextInput
                label={"Name"}
                placeholder="Your name"
                {...form.getInputProps("name")}
                className="w-full"
              />
              <TextInput
                label={"Email ID"}
                placeholder="abc@gmail.com"
                inputMode="email"
                {...form.getInputProps("email")}
                className="w-full"
              />

              <div className="flex w-full flex-col gap-0.5 pt-1">
                {/* <Label text={"Mobile Number"} /> */}
                <Text size={16}>Phone</Text>
                <div className="flex w-full gap-2">
                  <Select
                    data={[{ label: "+91", value: "+91" }]}
                    className="w-24"
                    iconWidth={30}
                    styles={{
                      rightSection: {
                        width: 16,
                        pointerEvents: "none",
                        paddingRight: 2,
                      },
                      input: {
                        paddingRight: 0,
                        paddingLeft: 0,
                        fontSize: 14,
                        fontWeight: 400,
                        color: "neutral.8",
                      },
                      icon: {
                        marginLeft: 2,
                      },
                    }}
                    icon={form.values.code === "+91" ? <IndianFlagIcon /> : ""}
                    {...form.getInputProps("code")}
                  />
                  <TextInput
                    placeholder="XXXXXXXXXX"
                    {...form.getInputProps("phone")}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-full w-full flex-col justify-end">
              <Divider className="flex w-full" />
              <div className="flex items-center justify-end gap-4 p-3">
                <Button
                  w={120}
                  h={44}
                  variant="light"
                  onClick={() => {
                    contactDetails
                      ? dispatch(setCurrentModal({ modalName: null }))
                      : form.reset();
                  }}
                  className=" border border-black"
                >
                  <Text size={16} weight={500}>
                    {contactDetails ? "Cancel" : "Clear"}
                  </Text>
                </Button>
                <Button
                  variant="filled"
                  w={120}
                  h={44}
                  c={"white"}
                  className=" rounded border bg-primary"
                  type="submit"
                >
                  <Text size={16} weight={500} tt={"uppercase"}>
                    {title}
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ContactModal;
