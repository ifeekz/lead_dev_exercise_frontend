
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form, Nav, Card, Row, Table, InputGroup, Col } from 'react-bootstrap';

import Link from "next/link";
import { orderService } from "../services/order.service";
import ReactPaginate from "react-paginate";

type Order = {
  id: string,
  product_category: string,
  price: string,
  product_id: string
}

export const OrdersTable = () => {
  const [orders, setOrders]: Array<any> = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [sort, setSort] = useState("shipping_limit_date");
  const router = useRouter()

  useEffect(() => {
    const limit: any = router.query?.limit || 20
    const offset: any = router.query?.offset || 0
    const sort: any = router.query?.sort || "shipping_limit_date"

    orderService.getAll(limit, offset, sort).then((response: { data: any; total: number; }) => {
      setOrders(response.data)
      setTotalOrders(response.total)
      setItemsPerPage(limit);
      setItemOffset(offset);
      setPageCount(Math.ceil(totalOrders / limit));
    });
  }, []);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % totalOrders;
    setItemOffset(newOffset);
    orderService.getAll(itemsPerPage, newOffset, sort).then((response: { data: any; total: number; }) => {
      setOrders(response.data);

      router.push({
        pathname: '/',
        query: {
          limit: itemsPerPage,
          offset: newOffset,
          sort,
        }
      });
    });
  };

  const handlePageLimitChange = (event: any) => {
    const limit = event.target.value
    router.push({
      pathname: '/',
      query: {
        limit: limit,
        offset: itemOffset,
        sort,
      }
    });
    setItemsPerPage(limit);
    orderService.getAll(limit, itemOffset, sort).then((response: { data: any; total: number; }) => {
      setOrders(response.data);
    });
  }

  const handleSort = (sortBy: string) => {
    router.push({
      pathname: '/',
      query: {
        limit: itemsPerPage,
        offset: itemOffset,
        sort: sortBy,
      }
    });
    setSort(sortBy);
    orderService.getAll(itemsPerPage, itemOffset, sortBy).then((response: { data: any; total: number; }) => {
      setOrders(response.data);
    });
  }

  return (
    <>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Form.Select aria-label="Page limit"
              value={itemsPerPage}
              onChange={handlePageLimitChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Order Id</th>
                <th className="border-bottom">Product Category</th>
                <th className="border-bottom" onClick={() => handleSort('price')}>Price</th>
                <th className="border-bottom">Product Id</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order: Order, index: any) =>
                <tr key={index}>
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

              {orders && <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                // @ts-expect-error
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />}
            </Nav>
            {/* <small className="fw-bold">
            Showing <b>{totalOrders}</b> out of <b>25</b> entries
          </small> */}
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};