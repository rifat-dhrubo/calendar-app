import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { turquoise, lightBlack, grey, red, error } from '../utils/colors';
import { Log } from '../utils/FormCompoment';

const Data = ({ data }) => {
  const { summary, description, start, end, _id, userId } = data;

  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (formData) => {
    const obj = { id: _id, ...formData };

    const payload = JSON.stringify({ ...obj });

    async function saveEvents() {
      await fetch('/event/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      })
        .then((response) => {
          if (response.status >= 400) console.error('error');

          return response.json();
        })
        .then((response) => {
          if (response.err == null) {
            console.log(response);
          }
        });
    }

    saveEvents();
  };

  return (
    <Card>
      <div className="title">
        <h2>Name: {summary}</h2>
      </div>
      <div className="info">
        <p>Organizer: {userId.name}</p>
        <p>Description: {description}</p>
        <p>Start: {start.dateTime}</p>
        <p>End: {end.dateTime}</p>
        {/* <p>{_id}</p> */}
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            Your Email
            <input
              type="text"
              name="email"
              ref={register({
                required: 'You must specify an email',
                pattern: /^\S+@\S+$/i,
              })}
            />
          </label>
          {errors.email && <p className="error">You must specify an email</p>}
          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </Card>
  );
};
Data.propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = styled.div`
  padding: 10px;
  min-height: 200px;
  flex-basis: 25%;
  margin: 10% 1%;
  color: ${grey};
  background: ${lightBlack};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  transition: 0.18s all ease;
  border: 1px solid ${lightBlack};
  @media only screen and (max-width: 1024px) {
    flex-basis: 40%;
  }
  @media only screen and (max-width: 727px) {
    flex-basis: 60%;
  }
  &:hover {
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  }
  & .title {
    color: ${turquoise};
  }

  & .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 50%;

    @media only screen and (max-width: 767px) {
      flex-basis: 70%;
    }
    & .link {
      text-decoration: none;
      color: ${red};
    }
    & .error {
      color: ${error};
      font-size: 12px;
      margin: 0;
    }
    p {
      color: ${grey};
    }
    & .submit {
      font-size: 20px;
      margin-top: 1rem;
    }
    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid white;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 13px;
      margin-top: 20px;
      color: white;
      font-size: 16px;
      font-weight: 200;
    }
  }
`;

export default Data;
