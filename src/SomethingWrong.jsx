
const SomethingWrong = ({text="Something Went Wrong"}) => {
    return (
        <p className="text-lg font-semibold text-red-500">
            {text}
        </p>
    );
};

export default SomethingWrong;