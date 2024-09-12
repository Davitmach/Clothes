import './brands.scss';
function Brands() {
return(
    <div className='Brands_box'>
        <div className="Brand">
        <div className='Title_box'>
            <div className='Title'><h1>Top Brands Deal</h1></div>
            <div className='Description'><span>Up To <div style={{color:'#FBD103'}} >60%</div> off on brands</span></div>
        </div>
        <div className='Brands'>
            <div><img src={`${process.env.PUBLIC_URL}/home/brands/nike.png`}/></div>
            <div><img src={`${process.env.PUBLIC_URL}/home/brands/h&m.png`}/></div>
            <div><img src={`${process.env.PUBLIC_URL}/home/brands/levis.png`}/></div>
            <div><img src={`${process.env.PUBLIC_URL}/home/brands/polo.png`}/></div>
            <div><img src={`${process.env.PUBLIC_URL}/home/brands/puma.png`}/></div>
        </div>
        </div>
    </div>
)
}
export default Brands;