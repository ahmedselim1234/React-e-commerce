const CategoryCard = ({ background, img, title }) => {
    return (
        <div className="flex flex-col items-center justify-center p-2 group cursor-pointer hover-lift flex-shrink-0 w-32 sm:w-40">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 p-4 shadow-sm group-hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-100">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <img src={img} alt={title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-primary transition-colors text-center">{title}</p>
        </div>
    )
}

export default CategoryCard;
