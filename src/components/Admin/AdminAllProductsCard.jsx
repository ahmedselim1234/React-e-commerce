import { Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/features/product/productSlice";
import ToastServerSError from "../../utils/errorHandler";
import { toast } from "react-toastify";

const AdminAllProductsCard = ({ img, title, price, Averagerating, id }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation(id);
  const deleteButton = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("تمت الحذف  بنجاح", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      ToastServerSError(err);
    }
  };
  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <button
              disabled={isLoading}
              onClick={() => deleteButton(id)}
              className="d-inline item-delete-edit"
            >
              ازاله
            </button>
            <Link to={`/admin/editproduct/${id}`}>

            <div className="d-inline item-delete-edit">تعديل</div>
            </Link>
          </Col>
        </Row>
        <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
          <Card.Img style={{ height: "228px", width: "100%" }} src={img} />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{title}</div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{Averagerating}</div>
                <div className="d-flex">
                  <div className="card-currency mx-1">جنيه</div>
                  <div className="card-price">{price}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default AdminAllProductsCard;
