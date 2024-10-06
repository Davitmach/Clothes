const useViewed = () => {
  const SetProduct = (product) => {

    const savedProducts = localStorage.getItem("viewedProducts");
    let viewedProducts = savedProducts ? JSON.parse(savedProducts) : [];


    viewedProducts.push(product);


    if (viewedProducts.length > 4) {
      viewedProducts = viewedProducts.slice(-4);
    }

   
    localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
  };

  return { SetProduct };
};

export default useViewed;
