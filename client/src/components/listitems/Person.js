import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";

const getStyles = () => ({
  card: {
    width: "265px",
  },
  link: {
    fontSize: "14px",
    color: "blue",
    textDecoration: "underline",
  },
});
const styles = getStyles();
const Person = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
            <Link
              key="LEARN MORE"
              to={"/" + id}
              title="LEARN MORE"
              style={styles.link}
              reloadDocument={true}
            >
              LEARN MORE
            </Link>,
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  );
};
export default Person;
