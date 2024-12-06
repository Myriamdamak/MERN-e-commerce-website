import { useEffect, useState } from "react";
import Layout from "../Layouts/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { orderListAction } from "../Redux/Actions/Order";
import moment from "moment";
import { Loading } from "../components/Loading";

export function OrderHistory() {
  const dispatch = useDispatch();
  const [selectedDuration, setSelectedDuration] = useState("this week");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  const orderListReducer = useSelector((state) => state.orderListReducer);
  const { orders, loading } = orderListReducer;

  useEffect(() => {
    // Filter orders whenever the orders or selectedDuration changes
    if (orders && Array.isArray(orders)) {
      filterOrders(orders, selectedDuration);
    }
  }, [orders, selectedDuration]);

  const filterOrders = (orders, duration) => {
    let filtered = [];
    const now = moment();
    
    // Check if orders is valid and is an array
    if (!orders || !Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }
  
    switch (duration) {
      case "this week":
        // This week - from start of this week to now
        filtered = orders.filter((order) =>
          moment(order.createdAt).isSame(now, "week")
        );
        break;
      case "this month":
        // This month - from start of this month to now
        filtered = orders.filter((order) =>
          moment(order.createdAt).isSame(now, "month")
        );
        break;
      case "last 3 months":
        // Last 3 months
        filtered = orders.filter((order) =>
          moment(order.createdAt).isBetween(now.clone().subtract(3, "months"), now)
        );
        break;
      case "last 6 months":
        // Last 6 months
        filtered = orders.filter((order) =>
          moment(order.createdAt).isBetween(now.clone().subtract(6, "months"), now)
        );
        break;
      case "this year":
        // This year - from start of the year to now
        filtered = orders.filter((order) =>
          moment(order.createdAt).isSame(now, "year")
        );
        break;
      default:
        // Show all orders if no filter is selected
        filtered = orders;
    }
  
    // Set filtered orders to state
    setFilteredOrders(filtered);
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  My orders
                </h2>

                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                  <div>
                    <label
                      htmlFor="order-type"
                      className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select order type
                    </label>
                    <select
                      id="order-type"
                      className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>All orders</option>
                      
                    </select>
                  </div>

                  <span className="inline-block text-gray-500 dark:text-gray-400">
                    from
                  </span>

                  <div>
                    <label
                      htmlFor="duration"
                      className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select duration
                    </label>
                    <select
                      id="duration"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    >
                      <option value="this week">this week</option>
                      <option value="this month">this month</option>
                      <option value="last 3 months">the last 3 months</option>
                      <option value="last 6 months">the last 6 months</option>
                      <option value="this year">this year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders &&
                    filteredOrders.map((order) => (
                      <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6">
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Order ID:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">
                              #{order._id}
                            </a>
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Date:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {moment(order.createdAt).format("MMM Do YY")}
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Price:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            ${order.totalPrice}
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Status:
                          </dt>
                          <dd
                            className={
                              order.isPaid
                                ? `me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300`
                                : `me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300`
                            }
                          >
                            <svg
                              className="me-1 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 11.917 9.724 16.5 19 7.5"
                              />
                            </svg>
                            {order.isPaid ? `Paid` : `Not Paid yet`}
                          </dd>
                        </dl>

                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                          <button
                            type="button"
                            className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                          >
                            Order again
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
