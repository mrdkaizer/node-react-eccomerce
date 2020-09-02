import { getFetch } from "../../Utils/communication";
import NotFound from "../../Components/NotFound";
import "./Product.css";
import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

import { connect } from "react-redux";
import { addCart } from "../../actions/addAction";

class Product extends Component {
  constructor(props) {
    super(props);

    this.cartMessage = React.createRef();
  }

  state = {
    info: {},
    NotFound: false,
    product: {
      name: "",
      link: "",
      available: "",
      price: 0,
      quantity: 1,
      discount: "",
      description: "",
      images: [{ image: "" }],
    },
  };

  //Local State Update
  add = () => {
    const product = this.state.product;
    if (!product.quantity) {
      product.quantity = 2;
    } else {
      product.quantity++;
    }
    this.setState({ product });
  };
  sub = () => {
    const product = this.state.product;
    if (!product.quantity) {
      product.quantity = 1;
    } else {
      product.quantity =
        product.quantity > 1 ? product.quantity - 1 : product.quantity;
    }

    this.setState({ product });
  };
  //End of Local State

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const product = await getFetch(`/product/${params.id}`);

    if (!product) {
      this.setState({ NotFound: true });
      return;
    }

    this.setState({ product });
  }

  render() {
    return this.state.NotFound ? (
      <NotFound />
    ) : (
      <div className="container">
        <h4 className="text-primary text-right">
          {this.state.product.discount
            ? this.state.product.discount + "% DISCOUNT"
            : ""}
        </h4>
        <div className="loader"></div>
        <div className="row pt-5">
          <div className="col-md-7">
            <div className="left-column">
              <Carousel>
                {this.state.product.images.map((answer) => {
                  return (
                    <Carousel.Item key={answer.image}>
                      <img
                        className="img-responsive"
                        src={answer.image}
                        alt={answer.image}
                      ></img>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="col-md-4 mr-auto">
            <div className="right-column">
              <div className="product-description">
                <h2>
                  <b>{this.state.product.name}</b>
                </h2>

                <p
                  dangerouslySetInnerHTML={{
                    __html: this.state.product.description,
                  }}
                ></p>
              </div>

              <div className="product-configuration">
                <div className="cable-config">
                  <h5 style={{ textDecoration: "line-through" }}>
                    {this.state.product.pricePreDiscount
                      ? this.props.info.currencySymbol +
                        " " +
                        this.state.product.pricePreDiscount +
                        " "
                      : ""}
                  </h5>
                  <span>
                    {this.props.info.currencySymbol} {this.state.product.price}{" "}
                    per item
                  </span>

                  <div className="cable-choose">
                    <div className="def-number-input number-input safari_only">
                      <button onClick={this.sub} className="minus"></button>
                      <input
                        className="quantity"
                        value={this.state.product.quantity}
                        type="number"
                        readOnly
                      />
                      <button onClick={this.add} className="plus"></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-price">
                <div className="row">
                  <div className="alert-warning">
                    <div className="col-md-12"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span ref={this.price}>
                      {this.props.info.currencySymbol}{" "}
                      {(
                        this.state.product.price *
                        (this.state.product.quantity
                          ? this.state.product.quantity
                          : 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 col-md-12">
                    <b className="text-danger">
                      {this.state.product.available <= 0 ? (
                        "SOLD OUT"
                      ) : (
                        <button
                          onClick={() => {
                            this.props.addCart(this.state.product);
                            this.cartMessage.current.className =
                              "alert alert-success";

                            setTimeout(() => {
                              this.cartMessage.current.className = "d-none";
                            }, 1000);
                          }}
                          className="site-btn"
                        >
                          ADD TO CART
                        </button>
                      )}
                    </b>
                  </div>
                  <div className="d-none" ref={this.cartMessage} role="alert">
                    Cart has been updated.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <app-related></app-related>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.infoReducer,
});
export default connect(mapStateToProps, { addCart })(Product);
