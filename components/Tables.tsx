
import { Key, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Nav, Card, Table } from 'react-bootstrap';

import Link from "next/link";
import { orderService } from "../services/order.service";
import PaginationComponent from "./Pagination";

type Order = {
  id: string,
  product_category: string,
  price: string,
  product_id: string
}

export const OrdersTable = () => {
  const [orders, setOrders]: Array<any> = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const limit: any = router.query?.limit || 10
    const offset: any = router.query?.offset || 0
    const sort: any = router.query?.sort || "shipping_limit_date"

    orderService.getAll(limit, offset, sort).then((response: { data: any; total: number; }) => {
      setOrders(response.data)
      setPageCount(response.total / limit);
      setTotalOrders(response.total);
      setItemsPerPage(limit)
    });
  }, [router.isReady]);

  const setCurrentPage = () => {

  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Order Id</th>
              <th className="border-bottom">Product Category</th>
              <th className="border-bottom">Price</th>
              <th className="border-bottom">Product Id</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order: { id: Key; product_category: string; price: string; product_id: string; }) =>
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_category}</td>
                <td>{order.price}</td>
                <td>{order.product_id}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link href={`/orders/${order.id}`} onClick={() => router.push(`/orders/${order.id}`)} className="btn btn-sm btn-primary mr-1">View</Link>
                </td>
              </tr>
             )
            }
            {
              !orders &&
              <tr>
                <td colSpan={5} className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            }
            {
              orders && !orders.length &&
              <tr>
                <td colSpan={5} className="text-center">
                  <div className="p-2">No orders To Display</div>
                </td>
              </tr>
            }
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            {/* <PaginationComponent
              itemsCount={totalOrders}
              itemsPerPage={itemsPerPage}
              currentPage={1}
              setCurrentPage={setCurrentPage}
              alwaysShown={false}
            /> */}
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalOrders}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};