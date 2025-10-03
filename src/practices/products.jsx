import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleOpen = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "#fff",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 2,
          fontWeight: 600,
          color: "#333",
        }}
      >
        Mini E-commerce Website
      </Typography>

      <Tabs
        value={selectedCategory}
        onChange={(e, value) => setSelectedCategory(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mt: 2, mb: 4, px: 2 }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>

      <div style={gridStyle}>
        {filteredProducts.map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 345,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="auto"
                image={item?.images[0]}
                alt={item?.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item?.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                ${item.price}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpen(item)}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {selectedProduct && (
        <Modal open={!!selectedProduct} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h5" component="h2" fontWeight="bold">
              {selectedProduct.title}
            </Typography>
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10px",
                marginTop: "12px",
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="h6" color="primary">
                ${selectedProduct.price}
              </Typography>
              <Rating
                name="read-only"
                defaultValue={selectedProduct.rating}
                precision={0.5}
                readOnly
              />
            </Box>
            <Typography sx={{ mt: 2, color: "#555" }}>
              {selectedProduct.description}
            </Typography>
            <Typography sx={{ mt: 1, fontStyle: "italic", color: "#999" }}>
              Discount: {selectedProduct.discountPercentage}%
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}
