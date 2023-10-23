import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx/xlsx';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import Button from "./components/Button"
import Modal from './components/Modal';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { WKT } from 'ol/format';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';

const App = () => {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [len, setLen] = useState('');
  const [status, setStatus] = useState('');
  const [wkt, setWkt] = useState('');
  const openModal = () => {
    setModalOpen(true);
  }


  const closeModal = () => {
    setModalOpen(false);
  }

  const handleLenChange = (e) => {
    setLen(e.target.value);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }
  const handleWktChange = (e) => {
    setWkt(e.target.value);
  }

  const handleAddData = ({ len, status, wkt }) => {
    setData(prevData => {
      const newId = prevData.length > 0 ? Math.max(...prevData.map(item => item.id)) + 1 : 1;
      const newData = {
        id: newId,
        len,
        status,
        wkt
      };
      return [newData, ...prevData];
    });
    closeModal();
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const sort = (data) =>{
       const sortedData = [...data]
       sortedData.sort((a,b) => b.id - a.id)
       return sortedData
    }
    reader.onload = (e) => {
      const content = e.target.result;
      const workbook = XLSX.read(content, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const sortedData = sort(jsonData)
      setData(sortedData);
    };
    
    reader.readAsBinaryString(file);
    
  };


  useEffect(() => {
    if (data) {
      const columns = [...Object.keys(data[0]).map(key => ({ title: key, field: key, headerFilter:"input" })),{
        formatter: (cell) => {
          const selectedRow = cell.getRow().getData();
          return `
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 edit-button" data-id="${selectedRow.id}">Edit</button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded delete-button" data-id="${selectedRow.id}">Delete</button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded show-on-map-button" data-id="${selectedRow.id}">Show on Map</button>
          `
        },
        hozAlign:"center",  
      
        cellClick: (e) => {
          const buttonType = e.target.classList.contains('edit-button') ? 'edit' : e.target.classList.contains('delete-button') ? 'delete': 'show-on-map';
          const selectedRowId = e.target.dataset.id;
          
          if (buttonType === 'edit') {
            const selectedRow = data.find(row => row.id === parseInt(selectedRowId));
            setLen(selectedRow.len);
            setStatus(selectedRow.status);
            setWkt(selectedRow.wkt)
            console.log(selectedRow);
            openModal();
          } else if (buttonType === 'delete') {
            setData(data.filter(row => row.id !== parseInt(selectedRowId)));
          }
          // else if (buttonType === 'show-on-map') {
          //   const selectedRow = data.find(row => row.id === parseInt(selectedRowId));
          //   const wktFormat = new WKT();
          //   const feature = wktFormat.readFeature(selectedRow.wkt);
          //   const vectorSource = new VectorSource({
          //     features: [feature]
          //   });
          //   const vectorLayer = new VectorLayer({
          //     source: vectorSource,
          //     style: new Style({
          //       image: new Icon({
          //         anchor: [0.5, 1],
          //         src: 'https://openlayers.org/en/latest/examples/data/icon.png'
          //       })
          //     })
          //   });
          //   // map.addLayer(vectorLayer);
          //   // map.getView().fit(vectorSource.getExtent());
          // }

        },

      
      }];

      const customHeaderFilter = (headerValue, rowValue) => {
        if (!headerValue)  return true; 
        return String(rowValue).toLowerCase().includes(String(headerValue).toLowerCase());
      };
      new Tabulator("#table", {
        headerFilterLiveFilterDelay:600,  
        height: "100%",
        data: data,
        layout: "fitColumns",
        columns: columns,
        headerFilterFunc: customHeaderFilter, 
        pagination:true, 
        paginationSize:10,
        
      });
    }
  }, [data]);


 
  
  return (
    <>
     <div className="flex">
        <div className="w-1/2 p-4">
          <div className="w-full h-full"></div>
        </div>
      </div>
    <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          len={len}
          status={status}
          wkt={wkt}
          handleLenChange={handleLenChange}
          handleStatusChange={handleStatusChange}
          handleWktChange={handleWktChange}
          handleSubmit={handleAddData}
      />
       <div className='mt-5 ml-4 flex gap-5'>
          <Button  fileUpload={handleFileUpload}  title={"Load Excel File"}/>
          {
            data && (  <button 
              className='text-xl cursor-pointer border border-gray-300 bg-cyan-200 py-2 px-4 
              rounded-md hover:outline-none hover:bg-cyan-400 transition hover:text-white'
              onClick={openModal}>Add New Data</button>)
          }
        

       </div>
      {
        data && (
          <div id="table" className='mt-5 w-full'></div> 
        )
      }
      <div className='flex px-10 mt-10'>
       {data && <div className='w-[50%]'><PieChart data={data} /></div>  } 
       {data && <div className='w-[50%] mt-10'><BarChart data={data}/></div>}

      </div>
   
    </>
  );
};

export default App;
