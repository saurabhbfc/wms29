import React from "react";
import { Component } from "react";
import * as XLSX from 'xlsx';
import Axios from "axios";

function Nav() { 
 
   // process CSV data
   const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers1 = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log("one="+headers1)
    const headers2 = headers1.toString().replace(/ /g,"").split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log("two="+headers2)
    const headers = headers2.toString().replace(/\//g,"").split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log("three="+headers)
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    //const columns = headers.map(c => ({
  //    name: c,
  //    selector: c,
  //  }));
 
    //setData(list);
    //setColumns(columns);
    //console.log(list);
    
    
    Axios.post('http://localhost:3001/api/savecamsnav',
    list ,
    {mode: 'cors'},
    {headers:
      { 'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Max-Age' :'3000',
        'Access-Control-Allow-Headers' : ' Origin, Content-Type, X-Auth-Token, Accept, X-Requested-With',
       // 'Content-Type': 'application/json, charset=utf-8',
        'Content-Type':'application/x-www-form-urlencoded',
      }
    }).then((result) => {  
      console.log('success data inserted', result)
   });
  
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }

  return (  
    <>
    <style jsx>
      {`
      .list-group-item{
        border:none!important;
      }
      .list-group-item:hover{
        border:none!important;
      }
      `}
      </style>
    <div className="content-wrapper">
     <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>NAV</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">NAV</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-8 offset-md-2">
                <div className="col-md-12">
                    <div className="card card-outline card-success">
                    <div className="card-header">
                        <h3 className="card-title">Select Registrar Transfer Agent</h3>
                        <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                        </button>
                        </div>
                        {/* /.card-tools */}
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                               NAV
                            </button>
                            </h2>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">File input</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                        <input type="file" accept=".txt" onChange={handleFileUpload} />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                     </div>
                    </div>
                    {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
              </div>
              {/*/.col (left) */}
            </div>
            {/* /.row */}
          </div>{/* /.container-fluid */}
        </section>
      </div>
    </>
  );
 
};

export default Nav;
