export default function PageComponent({ title, buttons = "", children }) {
    // const layoutClass = Array.isArray(buttons) && buttons.length > 0 ? "sm:flex-row flex-col" : "";
    // console.log(buttons);
    

    return (
        <>
            <header className="bg-white shadow">
                <div className={`flex justify-between md:flex-row flex-col items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8`}>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4  sm:text-4xl">{title}</h1>
                    <div  className="flex justify-center flex-col items-center space-x-2 flex-wrap">
                    {buttons}
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    );
}
