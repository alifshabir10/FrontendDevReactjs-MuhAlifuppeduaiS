import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faStarHalfStroke,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = ({ isLoggedin }) => {
  const [filter, setFilter] = useState({
    openNow: false,
    priceRange: "",
    categoriesGet: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const navigate = useNavigate();

  const clearAllFilter = () => {
    setFilter({
      openNow: false,
      priceRange: "",
      categoriesGet: "",
    });
  };
  const filterDisabled = () => {
    return filter.openNow || filter.priceRange || filter.categoriesGet;
  };

  const getRandomStatus = () => {
    const statuses = ["Open Now", "Closed"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };
  const getRandomPrice = () => {
    const prices = ["$$$$", "$$$", "$$", "$"];
    setPrices(prices);
    const randomIndex = Math.floor(Math.random() * prices.length);
    return prices[randomIndex];
  };
  useEffect(() => {
    axios
      .get(`https://restaurant-api.dicoding.dev/list`)
      .then((response) => {
        const restaurantData = response.data.restaurants;
        const uniqueCategories = new Set();
        const restaurantsWithImages = restaurantData.map((restaurant) => {
          const pictureId = restaurant.pictureId;

          const randomStatus = getRandomStatus();
          const randomPrice = getRandomPrice();
          uniqueCategories.add(restaurant.city);
          const imageUrl = `https://restaurant-api.dicoding.dev/images/small/${pictureId}`;

          return {
            ...restaurant,
            imageUrl: imageUrl,
            status: randomStatus,
            price: randomPrice,
          };
        });
        const categories = Array.from(uniqueCategories);

        setCategories(categories);

        setRestaurants(restaurantsWithImages);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleRestaurantClick = (restaurant) => {
    navigate(`/details/${restaurant}`);
  };

  const CustomRating = ({ rating }) => {
    const solidStars = Math.floor(rating);
    const hasHalfStar = rating - solidStars >= 0.5;

    const stars = [];

    for (let i = 0; i < solidStars; i++) {
      stars.push(
        <FontAwesomeIcon width={13} className="" icon={faStarSolid} />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon width={13} icon={faStarHalfStroke} className="" />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon width={13} className="" icon={faStarRegular} />
      );
    }

    return <div>{stars}</div>;
  };
  return (
    <div className="container mt-3 ">
      <div class="container">
        <Navbar isLoggedin={isLoggedin} />
      </div>
      <div style={{ paddingLeft: "2rem" }} className="row">
        <div className="col">
          <label className="fs-1 ">Restaurants</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            mollitia nihil eius aliquam, a provident eum voluptates repudiandae
            magnam saepe minima magni quisquam omnis esse quasi asperiores quos
            eos laboriosam.
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div
        class="d-flex justify-content-between border-top border-bottom py-4"
        style={{ paddingLeft: "2rem" }}
      >
        <div className="d-flex gap-3 align-items-center">
          <label>Filters By:</label>

          {/* filter open  */}
          <div className="border-bottom pb-2 border-2 ">
            <label
              htmlFor="status"
              className="form-check-label d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                name="status"
                id="status"
                checked={filter.openNow}
                onChange={() =>
                  setFilter({ ...filter, openNow: !filter.openNow })
                }
                className="form-check-input visually-hidden"
              />
              <FontAwesomeIcon
                icon={faCircle}
                className={`text-primary ${
                  filter.openNow ? "bg-primary rounded-circle" : ""
                }`}
              />
              Open Now
            </label>
          </div>

          {/* price */}
          <select
            aria-label="Price"
            style={{ width: "7rem" }}
            className="btn border-bottom pb-2 rounded-bottom-0 text-start d-flex text-left justify-content-left border-2"
            value={filter.priceRange}
            onChange={(e) =>
              setFilter({ ...filter, priceRange: e.target.value })
            }
          >
            <option value="">Price</option>
            {prices.map((price) => (
              <option value={price}>{price}</option>
            ))}
          </select>

          {/* categories */}
          <select
            aria-label="Categories"
            style={{ width: "10rem" }}
            className="btn border-bottom pb-2 rounded-bottom-0 text-start d-flex text-left justify-content-left border-2"
            value={filter.categoriesGet}
            onChange={(e) =>
              setFilter({ ...filter, categoriesGet: e.target.value })
            }
          >
            <option value="">Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          class="px-5 btn-primary btn"
          onClick={() => clearAllFilter()}
          disabled={!filterDisabled()}
        >
          CLEAR ALL
        </button>
      </div>
      <div className="">
        <div className="mt-3 fs-3 " style={{ paddingLeft: "2rem" }}>
          All Restaurants
        </div>
        <ul>
          <div class="row row-cols-1 row-cols-md-4 g-4 ">
            {restaurants
              .filter((restaurant) => {
                const isPriceMatch =
                  !filter.priceRange || filter.priceRange === restaurant.price;
                const isOpenNow =
                  !filter.openNow || restaurant.status === "Open Now";
                const CategoriesMatch =
                  !filter.categoriesGet ||
                  filter.categoriesGet === restaurant.city;
                return isPriceMatch && isOpenNow && CategoriesMatch;
              })
              .slice(0, showAllRestaurants ? restaurants.length : 8)
              .map((restaurant) => (
                <div class="col">
                  <div
                    class="my-4"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
                    <div key={restaurant.id}>
                      <img
                        src={restaurant.imageUrl}
                        alt={`Image of ${restaurant.name}`}
                        className="border"
                        style={{ width: "18.5rem", height: "10rem" }}
                      />

                      <div class="card-body">
                        <h5 class="card-title mt-3 text-capitalize">
                          {restaurant.name}
                        </h5>
                        <p className="card-text">{CustomRating(restaurant)}</p>
                        <div
                          class="d-flex justify-content-between align-items-center"
                          style={{ fontSize: "0.7rem" }}
                        >
                          <div className="">
                            {restaurant.city} - {restaurant.price}
                          </div>
                          <div className="d-flex justify-content-center align-items-center gap-1">
                            {restaurant.status === "Closed" ? (
                              <>
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    background: "red",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                                <div>{restaurant.status}</div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    background: "green",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                                <div>{restaurant.status}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="d-grid gap-2 mt-4">
                        <button
                          class="btn btn-primary rounded-0"
                          type="button"
                          onClick={() => handleRestaurantClick(restaurant.id)}
                        >
                          LEARN MORE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ul>
        <div className="d-flex justify-content-center m-5">
          {!showAllRestaurants && restaurants.length > 8 && (
            <div className="text-center">
              <button
                class="btn border border-2 border-black text-black"
                type="button"
                style={{ padding: "0.6rem 10rem" }}
                onClick={() => setShowAllRestaurants(true)}
              >
                LOAD MORE
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
