import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { debounce } from 'ts-debounce'
import { Layout, Row, Col, Input, Pagination, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getPeople } from 'services/api'
import { selectPeople, selectCount, updatePeople, updateCount } from 'stores/dataSlice'
import { MemoizedCharacterCard } from 'components/characterCard/CharacterCard'
import { LoadingIndicator } from 'components/loadingIndicator/LoadingIndicator'
import 'antd/dist/antd.css'
import classes from './Main.module.scss'

const { Header, Footer, Content } = Layout
const { Title } = Typography

const pageSize = 10

export function Main() {
  const dispatch = useDispatch()
  const router = useRouter()

  // No much sens to store this data in Redux, done cause required in task
  // Can be stored in component state or in react context
  const people = useSelector(selectPeople)
  const count = useSelector(selectCount)

  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getPeople(page, searchQuery || undefined).then((data) => {
      setIsLoading(false)
      dispatch(updatePeople(data.results))
      dispatch(updateCount(data.count))
    })

    // below triggers not deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery])

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page)
  }

  const onSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // React 18 Automatic Batching
    setPage(1)
    setSearchQuery(value)
  }, 300)

  const onCharacterClick = (url: string) => {
    const parsedUrl = url.split('/').filter(Boolean)
    const id = parsedUrl[parsedUrl.length - 1]

    if (id) {
      router.push(`/${id}`)
    }
  }

  return (
    <Layout className={classes.layout}>
      <Header>
        <Input
          size="large"
          placeholder="Search character..."
          prefix={<UserOutlined />}
          onChange={onSearchChange}
        ></Input>
      </Header>
      <Content className={classes.content}>
        {people?.length ? (
          <Row gutter={[16, 16]}>
            {people.map((p) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={p.name} className={classes.card}>
                <MemoizedCharacterCard character={p} onClick={() => onCharacterClick(p.url)} />
              </Col>
            ))}
          </Row>
        ) : (
          people && (
            <div className={classes.noResults}>
              <Title level={2}>No results found</Title>
            </div>
          )
        )}
        {isLoading && (
          <div className={classes.loadingIndicatorContainer}>
            <LoadingIndicator />
          </div>
        )}
      </Content>
      <Footer>
        <Pagination
          className={classes.pagination}
          total={count}
          current={page}
          defaultPageSize={pageSize}
          showSizeChanger={false}
          onChange={onPageChange}
          responsive
        ></Pagination>
      </Footer>
    </Layout>
  )
}
