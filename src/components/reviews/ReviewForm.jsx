import React, { useContext, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import { useLoaderData } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const ReviewForm = () => {
  const review = useLoaderData();
  const { user } = useContext(AuthContext);
  const { _id, Description, category, Photourl, Price, ServiceTitle } = review;
  const [ratings, setRating] = useState(0);
  console.log(ratings);

  const handealSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const reviewText = form.reviewText.value;
    const data = form.date.value;
    const review = { name, email, reviewText, data, ratings };
    console.log(review);
    axios.post('http://localhost:5000/review', review).then(data => {
      console.log(data.data);
    });
  };

  return (
    <div className="m-10 text-center ">
      <div className="flex justify-center gap-4">
        <img className="w-40" src={Photourl} alt="" />
        <h2 className="text-2xl">{ServiceTitle}</h2>
      </div>
      {/* Add Review */}
      <div className=" lg:w-6/12 p-10  mx-auto mt-8    shrink-0 shadow-2xl">
        <form onSubmit={handealSubmit} className="">
          <div>
            <label className="label">
              <span className="text-xl font-bold">
                Rate your recent experience
              </span>
            </label>
            <div className="flex justify-start">
              <p className=" flex gap-2 items-center mt-2 text-gray-600">
                <Rating
                  style={{ maxWidth: 130 }}
                  value={ratings}
                  onChange={setRating}
                  required
                />
              </p>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Name</span>
            </label>
            <input
              type="text"
              name="name"
              disabled={true}
              placeholder="Name"
              defaultValue={user?.displayName}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled={true}
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="">
            <label className="label">
              <span className=" text-xl font-bold">
                Tell us more about your experience
              </span>
            </label>
            <label for="reviewText"></label>
            <textarea
              className="border w-full "
              placeholder="Tell us more about your experience."
              id="w3review"
              name="reviewText"
              rows="6"
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">
                Date of experience
              </span>
            </label>
            <input
              type="date"
              name="date"
              placeholder="Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Add Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
