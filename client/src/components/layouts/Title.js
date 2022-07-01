const getStyles = () => ({
  title: {
    fontSize: 30,
    padding: "5px",
    marginBottom: "10px",
  },
});

const Title = (props) => {
  const styles = getStyles();
  if (props.header) {
    styles.title.fontSize = 50;
  }

  return <h1 style={styles.title}>{props.name}</h1>;
};
export default Title;
