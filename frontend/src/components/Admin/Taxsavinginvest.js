import React, { Component } from 'react'
import $ from 'jquery';



class Transaction extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],

    };

  }
  

  componentDidMount(){
    document.title = "WMS | Folio Detail"
    //var hh = document.getElementById("reservation").value;
    //alert(hh)
    var financial_year = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
        financial_year = (today.getFullYear() - 1) +  "-" + today.getFullYear()
    } else {
        financial_year = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
    $.ajax({
      url: "http://localhost:3001/api/gettaxsaving",
      type: "GET",
      dataType: 'json',
      ContentType: 'application/json',
      success: function (result) {
     //   console.log("res="+JSON.stringify(result))
        this.setState({ data1: result.data });

      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);
          
      }
    });
   

  }
  render(){
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
                <h1>My Tax Saving Investment</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">My Tax Saving Investment</li>
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
              <div className="col-md-12 offset-md-0">
                    <div className="row">
                      <div className="col-md-4 offset-md-4 mt-3">
                        <div className="form-group">
                            <label>Select Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                                <input type="text" className="form-control float-right" id="reservation" name="dte" />
                            </div>
                            {/* /.input group */}
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header bg-primary">
                        <h3 className="card-title">Ravi Krishna</h3>
                        <div className="card-tools">
                          {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                            <div className="input-group-append">
                              <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                              <th>S. No.</th>
                              <th>Trxn_nature</th>
                              <th>Pan</th>
                              <th>Scheme</th>
                              <th>Inv_name</th>
                            </tr>
                          </thead>
                          <tbody>
          
         {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
           <td>{item.trxn_nature}</td>
           <td>{item.pan}</td>
           <td>{item.scheme}</td>
           <td>{item.inv_name}</td>
        </tr>
    
    ))}
     </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
              </div>
              {/*/.col (left) */}
            </div>
            {/* /.row */}
          </div>{/* /.container-fluid */}
        </section>
      </div>
    </>
  );
 }
};

export default Transaction;
