import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'ts-debounce'
import { Layout, Row, Col, Input, Pagination, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getPeople } from 'services/api'
import { MemoizedCharacterCard } from 'components/characterCard/CharacterCard'
import { LoadingIndicator } from 'components/loadingIndicator/LoadingIndicator'
import classes from './Main.module.scss'
import { IPeople } from 'types/swapi'
import { getIfFromUrl } from 'services/utils'

const { Header, Footer, Content } = Layout
const { Title } = Typography

const pageSize = 10

export function Main() {
  const router = useRouter()

  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [people, setPeople] = useState<IPeople[] | undefined>()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    getPeople(page, searchQuery || undefined).then((data) => {
      setIsLoading(false)
      setPeople(data.results)
      setCount(data.count)
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
    const id = getIfFromUrl(url)

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
