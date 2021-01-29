import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import $ from 'jquery';
//import Axios from 'axios';
import '../../../node_modules/aos/dist/aos.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


//var createReactClass = require('create-react-class');

class Transaction extends Component { 
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.onChangekstatus = this.onChangekstatus.bind(this);
    this.state = {
      selectedDay: undefined,
      data1:[],
      data2:[],
      data3:[],
      msg:"",
      msg3:"",
      rvalue:'',
      user:'',
      defaultValue:"",
    };
  }
  changeApplicant = (e) =>{
    // var sel = e.target.value;
     this.setState({ user: e.target.value });
     //alert(sel)
     var mon= ((new Date).getMonth()+1);
     var yer =((new Date).getFullYear());
     //var dt =(new Date).getMonth()+1;
     //alert(mon)
     //alert(yer)
    // document.title = "WMS | Folio Detail"
     $.ajax({
       url: "http://localhost:3001/api/gettransactionuserwise",
       type: "GET",
       data:{dt:mon,yr:yer,name:e.target.value},
        success: function (res3) {
         this.setState({
           data3: res3.data,
           msg3: res3.message});
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);          
       }
     });
     
   
 }
  onChangekstatus(e) {
  
    this.setState({
      rvalue: e.target.value    
    });
    if(e.target.value == "no"){
      $.ajax({
        url: "http://localhost:3001/api/getapplicant",
        type: "GET",
         success: function (res2) {
          this.setState({ data2: res2 });
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
    }
    //alert(e.target.value)
  }
  handleDayChange(day) {
    var mon= (day.getMonth()+1);
    var yer =(day.getFullYear());
   // alert(yer)
   this.setState({ selectedDay: day });
   //var rval = this.state.rvalue;
 if(this.state.rvalue == "yes"){
    $.ajax({
      url: "http://localhost:3001/api/gettransactionall",
      type: "GET",
      data:{dt:mon,yr:yer},
       success: function (res1) {
         //console.log("res=",res1.data)
        this.setState({
           data1: res1.data,
           msg: res1.message});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);         
      }
    });   
  }else{
    $.ajax({
      url: "http://localhost:3001/api/gettransactionuserwise",
      type: "GET",
      data:{dt:mon,yr:yer,name:this.state.user},
       success: function (res3) {
        this.setState({
          data3: res3.data,
          msg3: res3.message});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
  }
  }
  componentDidMount(){
    document.title = "WMS | Folio Detail"
    var mon= ((new Date).getMonth()+1);
    var yer =((new Date).getFullYear());
    $.ajax({
      url: "http://localhost:3001/api/gettransactionall",
      type: "GET",
      data:{dt:mon,yr:yer},
      dataType: 'json',
      ContentType: 'application/json',
      success: function (result) {
     //   console.log("res="+JSON.stringify(result))
        this.setState({ data1: result.data,
          msg: result.message });

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
                <h1>My Transaction</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">My Transaction</li>
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
                            <label>Select Month</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                                <div>
                                <DayPickerInput
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={this.handleDayChange}
        placeholder={`${formatDate(new Date())}`}
      />
      </div>
                                
                            </div>
                            {/* /.input group */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-12 form-group text-center check_btn">
                      <div className="form-group clearfix" style={{marginLeft:'-144px'}}>
                      <div className="icheck-primary d-inline mr-5">
                        <input type="radio" id="radioPrimary1" name="r1" defaultValue="yes" onClick={this.onChangekstatus}   />
                        <label for="radioPrimary1">
                          All
                        </label>
                      </div>
                      <div className="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary2" name="r1" defaultValue="no" onClick={this.onChangekstatus}   />
                        <label for="radioPrimary2">
                          Userwise
                        </label>
                      </div>
                    </div>
                        {/* <div className="form-check-inline">
                          <input type="radio" id="yes" name="kstatus" defaultValue="yes" onClick={this.onChangekstatus}  />
                          <label htmlFor="yes">ALL</label>&nbsp;   <br/>
                        </div> */}
                        {/* <div className="form-check-inline">
                          <input type="radio" id="no" name="kstatus" defaultValue="no" onClick={this.onChangekstatus}/>
                          <label htmlFor="no">Userwise</label>
                        </div>  */}
                      </div>
                    </div>
                    { ( this.state.rvalue==='yes')? (
                    <div>
                    { (this.state.msg==='Successfull')? (
                    <div className="card">
                      <div className="card-header bg-primary">
                        <h3 className="card-title"></h3>
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
                              <th>Scheme</th>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Trxn Type</th>
                            </tr>
                          </thead>
                          <tbody>
          
         {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
           <td>{item.scheme}</td>
           <td>{item.traddate}</td>
           <td>{item.amount}</td>
           <td>{item.trxn_nature}</td>
        </tr>
    
    ))}
     </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                     ):  (<div align="center"  className="col-sm-10">
                     <br/>
                   <h6>Data Not Found</h6>
                 </div>)}
                 </div>
): ( this.state.rvalue==='no')?(
  <div>
    <form role="form">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Applicant</label>
                    <select className="form-control" onChange={this.changeApplicant}>
                      <option>Select Applicant</option>
                      {this.state.data2.map((item, index) => (
                            <option value={item}>{item}</option>   
                        ))}
                     </select>
                  </div>
                </div>
                </div>
                </div>
                </form>
                <div> 

{ (this.state.msg3==='Successfull')? (
              <div className="card">
                <div className="card-header bg-primary">
                  <h3 className="card-title"></h3>
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
                        <th>Scheme</th>
                        <th>Amount</th>
                        <th>Folio_no</th>
                        <th>Date</th>
                       </tr>
                    </thead>
                   
                    <tbody>
                    {this.state.data3.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td> 
                            <td>{item.scheme}</td>
                            <td>{item.amount}</td>
                            <td>{item.folio_no}</td>
                            <td>{item.traddate}</td>
                            </tr>
                    
                    ))}
                        
                      </tbody>
                      
                  </table>
                  
                </div>
                {/* /.card-body */}
              </div>
                ):  (<div align="center"  className="col-sm-10">
                  <br/>
                <h6>Data Not Found</h6>
              </div>)}

</div>
     </div>
     
     ): (<div> <br /> </div>)}



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
