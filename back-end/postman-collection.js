// postman-collection.js
const fs = require("fs");

const collection = {
  info: {
    name: "Clothing E-commerce API",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [
    // Media Endpoints
    {
      name: "Media",
      item: [
        {
          name: "Get All Media",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/media",
              host: ["{{baseUrl}}"],
              path: ["media"],
            },
          },
        },
        {
          name: "Upload Image",
          request: {
            method: "POST",
            header: [],
            url: {
              raw: "{{baseUrl}}/media/upload",
              host: ["{{baseUrl}}"],
              path: ["media", "upload"],
            },
            body: {
              mode: "formdata",
              formdata: [
                {
                  key: "image",
                  type: "file",
                  src: "/path/to/sample.jpg",
                },
              ],
            },
          },
        },
        {
          name: "Delete Media",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/media/:id",
              host: ["{{baseUrl}}"],
              path: ["media", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{mediaId}}",
                },
              ],
            },
          },
        },
      ],
    },

    // Category endpoints
    {
      name: "Categories",
      item: [
        {
          name: "Get All Categories",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/categories",
              host: ["{{baseUrl}}"],
              path: ["categories"],
            },
          },
        },
        {
          name: "Create Category",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
            ],
            url: {
              raw: "{{baseUrl}}/categories",
              host: ["{{baseUrl}}"],
              path: ["categories"],
            },
            body: {
              mode: "raw",
              raw: JSON.stringify(
                {
                  name: "Men's Clothing",
                  slug: "mens-clothing",
                  image: "{{mediaId}}",
                },
                null,
                2
              ),
              options: {
                raw: {
                  language: "json",
                },
              },
            },
          },
        },

        // Additional category endpoints
        {
          name: "Update Category",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/categories/:id",
              host: ["{{baseUrl}}"],
              path: ["categories", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{categoryId}}"
                }
              ]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Women's Clothing",
                slug: "womens-clothing",
                image: "{{mediaId}}"
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Delete Category",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/categories/:id",
              host: ["{{baseUrl}}"],
              path: ["categories", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{categoryId}}"
                }
              ]
            }
          }
        }
      ]
    },

    // Product endpoints
    {
      name: "Products",
      item: [
        {
          name: "Get All Products",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products",
              host: ["{{baseUrl}}"],
              path: ["products"]
            }
          }
        },
        {
          name: "Get Product By Slug",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/products/:slug",
              host: ["{{baseUrl}}"],
              path: ["products", ":slug"],
              variable: [
                {
                  key: "slug",
                  value: "mens-t-shirt"
                }
              ]
            }
          }
        },
        {
          name: "Create Product",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/products",
              host: ["{{baseUrl}}"],
              path: ["products"]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                title: "Men's T-Shirt",
                slug: "mens-t-shirt",
                description: "Comfortable cotton t-shirt",
                price: 29.99,
                category: "{{categoryId}}",
                badges: ["new", "sale"],
                images: ["{{mediaId}}", "{{mediaId}}"],
                variants: [
                  {
                    name: "Size",
                    options: ["S", "M", "L", "XL"]
                  },
                  {
                    name: "Color",
                    options: ["Black", "White", "Blue"]
                  }
                ],
                stockQuantity: 100,
                inStock: true,
                thumbnailId: "{{mediaId}}"
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Update Product",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/products/:id",
              host: ["{{baseUrl}}"],
              path: ["products", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{productId}}"
                }
              ]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                title: "Updated T-Shirt",
                price: 34.99,
                stockQuantity: 75
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Delete Product",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/products/:id",
              host: ["{{baseUrl}}"],
              path: ["products", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{productId}}"
                }
              ]
            }
          }
        }
      ]
    },

    // Shipping endpoints
    {
      name: "Shipping",
      item: [
        {
          name: "Get All Shipping Options",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/shipping",
              host: ["{{baseUrl}}"],
              path: ["shipping"]
            }
          }
        },
        {
          name: "Create Shipping Option",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/shipping",
              host: ["{{baseUrl}}"],
              path: ["shipping"]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                city: "New York",
                priceHomeDelivery: 9.99,
                priceOfficeDelivery: 4.99
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Update Shipping Option",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/shipping/:id",
              host: ["{{baseUrl}}"],
              path: ["shipping", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{shippingId}}"
                }
              ]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                city: "New York",
                priceHomeDelivery: 12.99,
                priceOfficeDelivery: 6.99
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Delete Shipping Option",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/shipping/:id",
              host: ["{{baseUrl}}"],
              path: ["shipping", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{shippingId}}"
                }
              ]
            }
          }
        }
      ]
    },

    // Order endpoints
    {
      name: "Orders",
      item: [
        {
          name: "Get All Orders",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/orders",
              host: ["{{baseUrl}}"],
              path: ["orders"]
            }
          }
        },
        {
          name: "Get Order By ID",
          request: {
            method: "GET",
            url: {
              raw: "{{baseUrl}}/orders/:id",
              host: ["{{baseUrl}}"],
              path: ["orders", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{orderId}}"
                }
              ]
            }
          }
        },
        {
          name: "Create Order",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/orders",
              host: ["{{baseUrl}}"],
              path: ["orders"]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                customerName: "John Doe",
                customerPhone: "+1234567890",
                customerAddress: "123 Main St, Apt 4B",
                city: "New York",
                products: [
                  {
                    product: "{{productId}}",
                    quantity: 2,
                    variant: {
                      Size: "M",
                      Color: "Black"
                    }
                  }
                ],
                shippingMethod: "toHome"
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Update Order Status",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/orders/:id/status",
              host: ["{{baseUrl}}"],
              path: ["orders", ":id", "status"],
              variable: [
                {
                  key: "id",
                  value: "{{orderId}}"
                }
              ]
            },
            body: {
              mode: "raw",
              raw: JSON.stringify({
                status: "Processing"
              }, null, 2),
              options: {
                raw: {
                  language: "json"
                }
              }
            }
          }
        },
        {
          name: "Delete Order",
          request: {
            method: "DELETE",
            url: {
              raw: "{{baseUrl}}/orders/:id",
              host: ["{{baseUrl}}"],
              path: ["orders", ":id"],
              variable: [
                {
                  key: "id",
                  value: "{{orderId}}"
                }
              ]
            }
          }
        }
      ]
    }
  ],
  variable: [
    {
      key: "baseUrl",
      value: "http://localhost:5000/api",
      type: "string",
    },
  ],
};

fs.writeFileSync(
  "clothing-ecommerce-api.postman_collection.json",
  JSON.stringify(collection, null, 2)
);
console.log("Postman collection file created successfully!");
