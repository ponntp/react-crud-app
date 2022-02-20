import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function List() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
      setProducts(data);
    });
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link
            style={{
              backgroundColor: "#5AA897",
              borderColor: "#5AA897",
              fontFamily: "Droid Sans",
              fontSize: 20
            }}
            className="btn btn-secondary mb-2 float-end"
            to={"/product/create"}
          >
            Add Project
          </Link>
        </div>
        <div className="col-12">
          <div
            className="card card-body"
            style={{ backgroundColor: "#45526C" }}
          >
            <div
              className="table-responsive"
              style={{ backgroundColor: "#F8F5F1" }}
            >
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Project Name</th>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Project Description</th>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Telephone</th>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Email</th>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Project Image</th>
                    <th style={{ fontFamily: "Droid Sans",fontSize: 20 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((row, key) => (
                      <tr key={key}>
                        <td style={{ fontFamily: "Droid Sans",fontSize: 18, textAlign: "center" }}>
                          {row.title}
                        </td>
                        <td style={{ fontFamily: "Droid Sans",fontSize: 18,width: 400, textAlign: "left" }}>
                          {row.description}
                        </td>
                        <td>
                          <img
                            width="200px"
                            alt=""
                            src={`http://localhost:8000/storage/product/image/${row.image}`}
                          />
                        </td>
                        <td style={{width: 200}}>
                          <Link
                            to={`/product/edit/${row.id}`}
                            style={{
                              backgroundColor: "#F5A25D",
                              borderColor: "#F5A25D",
                              fontFamily: "Droid Sans",
                              fontSize: 20,
                            }}
                            className="btn btn-success me-2"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="danger"
                            style={{
                              backgroundColor: "#FA7F72",
                              borderColor: "#FA7F72",
                              fontFamily: "Droid Sans",
                              fontSize: 20,
                            }}
                            onClick={() => deleteProduct(row.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
