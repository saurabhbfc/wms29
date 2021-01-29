import React, { Component } from 'react'
import $ from 'jquery';



class Transaction extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],
      data2: [],
      user:'',
      year:'',
      msg2:"",
    };

  }
  changeApplicant = (e) =>{
    var sel = e.target.value;
    this.setState({user:sel});
    var yer =  document.getElementById("finanyear").value
     var fry = yer.split('-')[0];
     var sry = yer.split('-')[1];
    // alert(fry)
   // alert(sry)
   // alert(sel)
//var fy = ("01-04-"+yer.split('-')[0]).toLocaleString();
//var sy = ("31-03-"+yer.split('-')[1]).toLocaleString();
   // alert(typeof fry)
 //   alert(sy)
    $.ajax({
        url: "http://localhost:3001/api/getdividendall",
        type: "GET",
        data:{name:sel,fry:fry,sry:sry},
        dataType: 'json',
        ContentType: 'application/json',
        success: function (result2) {
       //   console.log("res="+JSON.stringify(result))
          this.setState({ data2: result2.data, msg2: result2.message });
  
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);
            
        }
      });
}
changeyear = (e) =>{
    var name = this.state.user;
    var sel = e.target.value;
    var fry = sel.split('-')[0];
    var sry = sel.split('-')[1];
   //var user = this.state.user;
   // alert(fry)
  //  alert(sry)
  //  alert(name)
    $.ajax({
        url: "http://localhost:3001/api/getdividendall",
        type: "GET",
        data:{name:name,fry:fry,sry:sry},
        dataType: 'json',
        ContentType: 'application/json',
        success: function (result2) {
       //   console.log("res="+JSON.stringify(result))
          this.setState({ data2: result2.data, msg2: result2.message });
  
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);
            
        }
      });
}

  componentDidMount(){
    document.title = "WMS | Folio Detail"
    var hh= document.getElementById("finanyear").value
    this.setState({year:hh})
   // alert(hh)
   // this.setState({year:sel})
    $.ajax({
        url: "http://localhost:3001/api/getapplicant",
        type: "GET",
         success: function (res1) {
          this.setState({ data1: res1}); 
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
                <h1>My Dividends</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">My Dividends</li>
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
                            <label>Select Financial Year</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                                <select className="form-control" onChange={this.changeyear}  id="finanyear" >
                                <option value="2020-2021">2020-2021</option>
                                <option value="2019-2020">2019-2020</option> 
                                <option value="2018-2019">2018-2019</option>
                                <option value="2017-2018">2017-2018</option>
                                <option value="2016-2017">2016-2017</option>
                              </select>
                                {/* <input type="text" className="form-control float-right" id="reservation" name="dte" /> */}
                            </div>
                            {/* /.input group */}
                        </div>
                      </div>
                    </div>

                    <div >
                      <div >
                        <h3 className="card-title"></h3>
                        <div className="card-tools">
                          {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                            <div className="input-group-append">
                              <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                            </div>
                          </div> */}
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Applicant</label>
                            <select className="form-control" onChange={this.changeApplicant}>
                              <option>Select Applicant</option>
                              {this.state.data1.map((item, index) => (
                                    <option value={item}>{item}</option>
                                  
                                ))}
                             </select>
                          </div>
                        </div>
                      </div>
                      {/* /.card-header */}
                      <div>
                      { ( this.state.msg2==='Successfull')? (
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                              <th>S. No.</th>
                              <th>Scheme</th>
                              <th>Amount</th>
                              </tr>
                          </thead>
                          <tbody>
          
         {this.state.data2.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
           <td>{item.SCHEME}</td>
           <td>{item.AMOUNT}</td>
           </tr>
    
    ))}
     </tbody>
                        </table>
                      </div>
                       ):  (<div align="center"  className="col-sm-10">
                       <br/>
                     <h6>Data Not Found</h6>
                   </div>)}
          
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
