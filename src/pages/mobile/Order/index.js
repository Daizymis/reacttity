import { Grid } from "antd-mobile";
function Order(props) {
  return (
    <>
      <Grid columns={3} gap={8}>
        <Grid.Item>
          <div>A</div>
        </Grid.Item>
        <Grid.Item span={2}>
          <div>B</div>
        </Grid.Item>
      </Grid>
    </>
  );
}
export default Order;
