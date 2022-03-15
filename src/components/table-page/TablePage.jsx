import React, { PureComponent } from 'react'
import { Table } from 'antd'
//import './index.less'
/**
 * 通用型表格组件
 * 默认分页
 */
export class TablePage extends PureComponent {
  getPageConfig = () => {
    const { pages = {} } = this.props
    return {
      total: pages.total ? pages.total : 0,
      showTotal: total => `总条数 ${pages.total ? pages.total : 0} 条`,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50'],
      onChange: (page, size) => this.props.search({ pageNum: page, pageSize: size } ),
      onShowSizeChange: (page, size) => this.props.search({ pageNum: page, pageSize: size } )
    }
  }

  render() {
    const { columns = [], rowSelection = null, dataSource = [], rowKey = 'id', loading, scrollConfig = {}, pageSize = 'default' } = this.props
    return (
      <div id="tablePage">
        <Table
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          size={ pageSize }
          pagination={this.getPageConfig()}
          loading={loading}
          bordered
          scroll={scrollConfig}
          rowSelection={rowSelection}
          locale={{ emptyText: '数据为空' }}
        />
      </div>
    )
  }
}