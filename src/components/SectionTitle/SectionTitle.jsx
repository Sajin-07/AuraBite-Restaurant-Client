
//maiin
// const SectionTitle = ({heading, subHeading}) => {
//     return (
//         <div className="mx-auto text-center md:w-4/12 my-8">
//             <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
//             <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
//         </div>
    

//     );
// };

// export default SectionTitle;




const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-7">
            <p className="text-orange-500 text-lg font-semibold tracking-wide mb-2 animate-fade">
                ⎯⎯ {subHeading} ⎯⎯
            </p>
            <h3 className="text-4xl font-bold uppercase py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg shadow-md border-2 border-orange-600 px-4 inline-block animate-fade">
                {heading}
            </h3>
        </div>
    );
};

export default SectionTitle;

