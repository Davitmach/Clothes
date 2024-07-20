function Img() {
    const imagePath = `${process.env.PUBLIC_URL}/singuploginbanner/verif.jpeg`;
return(
    <div className='Img_box'><img src={imagePath}/></div>
)
}
export default Img