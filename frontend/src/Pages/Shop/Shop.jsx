import { getFetch } from "../../Utils/communication";
import "./Shop.css";
import NotFound from "../../Components/NotFound";
import { connect } from "react-redux";
import { addCart } from "../../actions/addAction";

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { CommonLoading } from "react-loadingg";

function Shop(props) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [offset, setOffset] = useState(0);
  const [postData, setPostData] = useState([]);
  const [perPage] = useState(12);
  const [, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const receivedData = async () => {
      const {
        match: { params },
      } = props;

      let items = {};
      if (!params.id) {
        items = await getFetch("/product/");
      } else {
        items = await getFetch(`/product/category/${params.id}`);
        if (!items) {
          return setNotFound(false);
        }
      }

      const slice = items.slice(offset, offset + perPage);
      const data = slice.map((pd) => (
        <React.Fragment key={pd._id}>
          <div className="col-lg-3 col-md-4 col-6">
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{
                  backgroundImage: `url(${pd.images[0].image})`,
                }}
              >
                <ul className="product__item__pic__hover">
                  <center>
                    <li>
                      <a href={`/product/${pd.link}`}>
                        <i className="fa fa-eye"></i>
                      </a>
                    </li>
                    {pd.available <= 0 ? (
                      ""
                    ) : (
                      <li>
                        <button
                          onClick={() => {
                            props.addCart(pd);
                          }}
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      </li>
                    )}
                  </center>
                </ul>
              </div>
              <div className="product__item__text">
                <h6>
                  <a href={`/product/${pd.link}`}>{pd.name}</a>
                  <br />
                  <b className="text-danger">
                    {pd.available <= 0 ? "SOLD OUT" : ""}
                  </b>
                  <span className="text-primary">
                    {pd.discount ? pd.discount + "% off" : ""}
                  </span>
                </h6>
                <span style={{ textDecoration: "line-through" }}>
                  {pd.pricePreDiscount
                    ? props.info.currencySymbol +
                      " " +
                      pd.pricePreDiscount +
                      " "
                    : ""}
                </span>
                <h5>
                  {props.info.currencySymbol} {pd.price}{" "}
                </h5>
              </div>
            </div>
          </div>
        </React.Fragment>
      ));
      setPostData(data);
      setLoading(false);
      setPageCount(Math.ceil(items.length / perPage));
    };
    receivedData();
  }, [offset, perPage, props]);

  const handlePageClick = async (e) => {
    setCurrentPage(e.selected);
    setOffset(e.selected * perPage);
    window.scrollTo(0, 0);
  };

  return notFound ? (
    <NotFound />
  ) : (
    <section className="related-product">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title related__product__title">
              <h2>Related Products</h2>
            </div>
          </div>
        </div>

        <div className="row">{postData}</div>
        {loading ? (
          <CommonLoading />
        ) : (
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  cartProps: state.cartReducer,
  info: state.infoReducer,
});

export default connect(mapStateToProps, { addCart })(Shop);
