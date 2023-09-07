import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const TitleSearch: React.FC = () => {
  return (
    <SearchBar />
    {loading ? (
      <p>Loading...</p>
  ) :
  (
      <ItemList items={data} onItemClick={handleItemClick}/>
  )
  // (
  //     <div>
  //         <h2>Data from Django API:</h2>
  //         <ul>
  //             {data.map((item: Title) => (
  //                 <li key={item.id}>{item.title}</li>
  //             ))}
  //         </ul>
  //     </div>
  // )
  }
  );
}

export default TitleSearch;
