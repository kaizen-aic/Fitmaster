import React, { useEffect, useState } from 'react';

function Page1() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/page1')
      .then((response) => response.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Page 1</h1>
      <p>{data}</p>
    </div>
  );
}

export default Page1;
