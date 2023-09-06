import {
  faAddressBook,
  faCalendar,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCity,
  faLocation,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";

function RestaurantDetail({ isLoggedin }) {
  const [detailRestaurant, setDetailRestaurant] = useState([]);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://restaurant-api.dicoding.dev/detail/${id}`)
      .then((response) => {
        const pictureId = response.data.restaurant.pictureId;
        const imageUrl = `https://restaurant-api.dicoding.dev/images/small/${pictureId}`;
        setDetailRestaurant(response.data.restaurant);
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  console.log(detailRestaurant);
  return (
    <div className="container">
      <div class="container">
        <Navbar isLoggedin={isLoggedin} />
      </div>
      <div className="d-flex align-items-baseline gap-2">
        <button
          class="btn d-flex gap-2 align-items-center "
          onClick={() => navigate(`/`)}
          className=""
        >
          <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
          {/* back */}
        </button>
        <h2>Detail Restoran</h2>
      </div>

      <div>
        <div className="d-flex gap-2 align-items-baseline">
          <label className="mt-3 fs-2 text-capitalize mb-2 fw-bold">
            {detailRestaurant.name}
          </label>
          <span className="fs-3">-</span>
          <div className="d-flex gap-1 align-items-center">
            <FontAwesomeIcon icon={faStar} className="fa-lg" />
            <label className="fs-3 ">{detailRestaurant.rating}</label>
          </div>
        </div>
        <img
          src={imageUrl}
          alt={detailRestaurant.name}
          className="rounded border"
          style={{ width: "100%", height: "20rem" }}
        />

        <div>
          <label className="mt-3 fs-1 text-capitalize fw-bold">
            {detailRestaurant.name}
          </label>
          <div className="d-flex gap-3 align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faAddressBook} className="" />
                <div className="fs-6 ">{detailRestaurant.address}</div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="" color="gray" />
                <div className="fs-6 ">{detailRestaurant.rating}</div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faLocation} className="" color="green" />
              <div className="fs-6 mr-2">{detailRestaurant.city}</div>
            </div>
          </div>
          <p className="">{detailRestaurant.description}</p>
        </div>
      </div>
      {/* card review */}
      <div>
        <div class="card">
          <div class="card-header fs-3 font-bold">Review</div>
          <div class="card-body ">
            {detailRestaurant?.customerReviews?.map((detail) => (
              <>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    {" "}
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title">{detail.name}</h5>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="ml-2"
                          color="red"
                        />
                        {detail.date}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">{detail.review}</li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RestaurantDetail;
