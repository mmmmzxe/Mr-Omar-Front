import { FcOk } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { Accordion } from "flowbite-react";

function Order() {
  const styleAccordion = {
    backgroundColor: '#555555',
    marginTop: '20px',
    borderRadius: '10px',
    borderColor: '#3c3c3b',
    boxShadow: '0 0 10px #3c3c3b',
  };

  return (
    <>

      <Accordion dir="rtl" collapseAll style={styleAccordion}>

        <Accordion.Panel className="bg-black-color-dark rounded-lg  shadow-md mt-4 hover:rounded-lg hover:dark:bg-black-color">
          <Accordion.Title className="text-numberNotfound py-1.25 px-0 font-bold focus:outline-none rounded-lg focus:ring-0  dark:bg-black-color-dark hover:rounded-lg">
            <div className="flex mr-2.5 justify-between items-center gap-5 text-numberNotfound">
              <p>معلومات الاشتراك</p>
            </div>
          </Accordion.Title>
          <Accordion.Content className="p-5 rounded-b-lg">

            <section className=" bg-black-color  shadow-white shadow-sm  flex-wrap p-5 rounded-lg flex justify-between gap-3 mt-2">
              <div className="flex justify-between  text-center gap-12">
                <div>
                  <p className='text-white mt-1'>اشتراك شهر : نوفمبر</p>
                  <p className='text-white mt-1'>حاله الدفع : تم الدفع</p>
                  <p className='text-white mt-1'>اشتراك المنصه : 100 جنيه</p>
                </div>
              </div>


            </section>

          </Accordion.Content>
          <Accordion.Content className="p-5 rounded-b-lg">

            <section className="bg-black-color  shadow-white shadow-sm  flex-wrap p-5 rounded-lg flex justify-between gap-3 mt-2">
              <div className="flex justify-between  text-center gap-12">
                <div>
                  <p className='text-white mt-1'>اشتراك شهر : ديسمبر</p>
                  <p className='text-white mt-1'>حاله الدفع : لم يدفع</p>
                  <p className='text-white mt-1'>اشتراك المنصه : 200 جنيه</p>
                </div>
              </div>
            </section>

          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

    </>
  );



}

export default Order;
