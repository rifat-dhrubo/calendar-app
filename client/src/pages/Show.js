import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { black, grey } from '../utils/colors';
import Data from '../components/Data';

const Info = () => {
  const [allEventData, setAllEventData] = useState([]);

  useEffect(function loadEventData() {
    async function fetchData() {
      const data = await fetch(`/event`).then((response) => response.json());

      setAllEventData(data.event);
    }

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Row>
        {allEventData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 94vh;
  background: ${black};
  color: ${grey};
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-basis: 100%;
`;

export default Info;
