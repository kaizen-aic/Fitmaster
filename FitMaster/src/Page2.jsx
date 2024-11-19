import React, { useEffect, useState } from 'react';

function Page2() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/page2')
      .then((response) => response.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Page 2</h1>
      <p>{data}</p>
    </div>
  );
}

export default Page2;
