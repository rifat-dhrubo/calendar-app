import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { useForm, useFieldArray } from 'react-hook-form';
import { grey, black } from '../utils/colors';
import { Log } from '../utils/FormCompoment';

// import { AuthContext } from './AuthContext';

const Book = () => {
  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues: {
      events: [
        {
          summary: '',
          description: '',
          start: {
            dateTime: '',
            timeZone: 'Asia/Dhaka',
          },
          end: {
            dateTime: '',
            timeZone: 'Asia/Dhaka',
          },
        },
      ],
    },
  });
  const [formData, setFormData] = useState({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events',
  });

  const onSubmit = (data) => {
    const payload = JSON.stringify({ ...data });

    console.log(payload);

    async function saveEvents() {
      await fetch('/event', {
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
            setFormData({});
            console.log(response);
          }
        });
    }

    saveEvents();
  };

  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Set up your appointments</h1>
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

          {fields.map((item, index) => {
            return (
              <div key={item.id}>
                <label htmlFor={`events[${index}].summary`}>
                  Summary
                  <input
                    type="text"
                    name={`events[${index}].summary`}
                    ref={register()}
                  />
                </label>

                <label htmlFor={`events[${index}].description`}>
                  Description
                  <input
                    type="text"
                    name={`events[${index}].description`}
                    ref={register()}
                  />
                </label>

                <label htmlFor={`events[${index}].start.dateTime`}>
                  Appointment Start
                  <input
                    type="datetime-local"
                    name={`events[${index}].start.dateTime`}
                    ref={register()}
                  />
                </label>
                <input
                  type="hidden"
                  name={`events[${index}].start.timeZone`}
                  value="Asia/Dhaka"
                  ref={register()}
                />
                <label htmlFor={`events[${index}].end.dateTime`}>
                  Appointment Finish
                  <input
                    type="datetime-local"
                    name={`events[${index}].end.dateTime`}
                    ref={register()}
                  />
                </label>
                <input
                  type="hidden"
                  name={`events[${index}].end.timeZone`}
                  value="Asia/Dhaka"
                  ref={register()}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              append({
                summary: '',
                description: '',
                start: {
                  dateTime: '',
                  timeZone: 'Asia/Dhaka',
                },
                end: {
                  dateTime: '',
                  timeZone: 'Asia/Dhaka',
                },
              });
            }}
          >
            Add
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                events: [
                  {
                    summary: '',
                    description: '',
                    start: {
                      dateTime: '',
                      timeZone: 'Asia/Dhaka',
                    },
                    end: {
                      dateTime: '',
                      timeZone: 'Asia/Dhaka',
                    },
                  },
                ],
              })
            }
          >
            Reset
          </button>

          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </Log>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${grey};
  display: flex;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;

  button {
    cursor: pointer;
    width: 30%;
    box-shadow: 0px 2px 2px rgba(255, 255, 255, 0.25);

    margin: 0.5rem auto;
    font-family: inherit;
    font-weight: 400;
    text-align: center;
    font-size: 16px;
    border: 0px;
    transition: all 0.3s ease-in-out;
    padding: 10px;
    text-decoration: none;
    @media (max-width: 576px) {
      width: 30%;
      font-size: calc(16px + 1vw);
    }
    :focus {
      outline: 2px solid ${black};
    }
    :hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    :active {
      color: #ffffff;
      background: ${black};
    }
  }
`;

export default Book;
