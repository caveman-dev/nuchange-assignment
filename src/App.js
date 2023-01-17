import { useFormik } from "formik";
import "./App.css";
import * as Yup from "yup";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
function App() {
  const [token, setToken] = useState(false);
  const formik = useFormik({
    initialValues: {
      noofbt: "",
      prefixofbt: "",
      btperrow: "",
      noofrt: "",
      prefixofrt: "",
      rtperrow: "",
    },
    validationSchema: Yup.object({
      noofbt: Yup.number("Input Value should be a number").required(
        "Field is required",
      ),
      prefixofbt: Yup.string().required("Field is required"),
      btperrow: Yup.number("Input Value should be a number").required(
        "Field is required",
      ),
      noofrt: Yup.number("Input Value should be a number").required(
        "Field is required",
      ),
      prefixofrt: Yup.string().required("Field is required"),
      rtperrow: Yup.number("Input Value should be a number").required(
        "Field is required",
      ),
    }),
    onSubmit: (values) => {
      setToken(true);
    },
  });
  return (
    <div className="App ">
      <div className=" flex justify-content-center">
        <Card className="w-4 p-2 m-6" title="Token Generator">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-fluid grid ">
              {Object.keys(formik.initialValues).map((ele) => {
                return (
                  <>
                    <div className="field col-12 mb-0">
                      <span className="p-float-label">
                        <InputText
                          name={ele}
                          value={formik.values[ele]}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          disabled={token}
                        />
                        <label htmlFor="inputtext">
                          {ele === "noofbt"
                            ? "Number of Blue Tokens"
                            : ele === "prefixofbt"
                            ? "Prefix of blue tokens"
                            : ele === "btperrow"
                            ? "Blue Tokens per row"
                            : ele === "noofrt"
                            ? "Number of Red Tokens"
                            : ele === "prefixofrt"
                            ? "Prefix of Red tokens"
                            : "Red Tokens per row"}
                        </label>
                      </span>
                    </div>
                    <div className="text-red-600 pl-2 pr-2 pt-0 pb-0 mb-2 w-full text-right">
                      {formik.touched[ele] &&
                        formik.errors[ele] &&
                        formik.errors[ele]}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex justify-content-between p-2">
              <Button
                className="w-4"
                type="button"
                onClick={() => {
                  setToken(false);
                  formik.handleReset();
                }}
                label="Clear"
              />
              <Button
                type="submit"
                className="p-button-success w-4"
                label="Generate"
              />
            </div>
          </form>
        </Card>
      </div>
      {token && (
        <div className="flex justify-content-between align-items-start">
          {console.log("values", formik.values)}
          <div
            className="flex justify-content-around  flex-wrap"
            style={{
              width: `${
                (100 /
                  (Number(formik.values["btperrow"]) +
                    Number(formik.values["rtperrow"]))) *
                Number(formik.values["btperrow"])
              }vw`,
            }}
          >
            {new Array(Number(formik.values["noofbt"]))
              .fill(0)
              .map((ele, i) => {
                return (
                  <Card
                    className="card m-1 bg-primary text-white h-10rem"
                    style={{
                      width: `${
                        ((100 /
                          (Number(formik.values["btperrow"]) +
                            Number(formik.values["rtperrow"]))) *
                          Number(formik.values["btperrow"])) /
                          Number(formik.values["btperrow"]) -
                        Number(formik.values["btperrow"]) -
                        1
                      }vw`,
                    }}
                  >
                    {`${formik.values["prefixofbt"]}${i + 1}`}
                  </Card>
                );
              })}
          </div>
          <div
            className="flex justify-content-around  flex-wrap"
            style={{
              width: `${
                (100 /
                  (Number(formik.values["btperrow"]) +
                    Number(formik.values["rtperrow"]))) *
                Number(formik.values["rtperrow"])
              }vw`,
            }}
          >
            {new Array(Number(formik.values["noofrt"]))
              .fill(0)
              .map((ele, i) => {
                return (
                  <Card
                    className="card m-1 bg-red-600 text-white h-10rem"
                    style={{
                      width: `${
                        ((100 /
                          (Number(formik.values["btperrow"]) +
                            Number(formik.values["rtperrow"]))) *
                          Number(formik.values["rtperrow"])) /
                          Number(formik.values["rtperrow"]) -
                        Number(formik.values["btperrow"])
                      }vw`,
                    }}
                  >
                    {`${formik.values["prefixofrt"]}${i + 1}`}
                  </Card>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
