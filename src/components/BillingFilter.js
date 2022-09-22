// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import React, { Component } from "react";
import "./../style/Base.css";
import "./../App.css";
import Form from "react-bootstrap/Form";

class BillingFilter extends Component {
  render() {
    return (
      <div className="billingFilter-wrapper">
        <Form>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Form.Control type="email" placeholder="scarch..." />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Form.Select aria-label="Default select">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <div className="checkboxLabel-wrap">
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>Only uncertain categorization</span>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Form.Select aria-label="Default select">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <div className="checkboxLabel-wrap">
                {" "}
                <span className="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill={"#706e6e"}
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                </span>
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>categorization</span>
              </div>
              <div className="checkboxLabel-wrap">
                <span className="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill={"#706e6e"}
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                </span>
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>categorization</span>
              </div>
              <div className="checkboxLabel-wrap">
                <span className="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill={"#706e6e"}
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                </span>
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>categorization</span>
              </div>
              <div className="checkboxLabel-wrap">
                <span className="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill={"#706e6e"}
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                </span>
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>categorization</span>
              </div>
              <div className="checkboxLabel-wrap">
                <span className="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill={"#706e6e"}
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                </span>
                <Form.Check aria-label="option 1" clasName="checkbox" />
                <span>categorization</span>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default BillingFilter;
