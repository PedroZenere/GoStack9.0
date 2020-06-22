import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, ButtonPage } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filter: 'open',
      page: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${filter}`,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async loadPage() {
    const { repository, filter, page } = this.state;

    const response = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: `${filter}`,
        per_page: 5,
        page,
      },
    });
    console.log('Page no Handle Saida: ', page);

    this.setState({ issues: response.data });
  }

  async handleFilter(status) {
    await this.setState({
      filter: status,
      page: 1,
    });
    this.loadPage();
  }

  async handlePage(action) {
    const { page } = this.state;

    console.log('Page no Handle Entrada: ', page);
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadPage();
  }

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <a href="/">Voltar aos repositorios</a>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <div>
            <button type="button" onClick={() => this.handleFilter('all')}>
              All
            </button>
            <button type="button" onClick={() => this.handleFilter('open')}>
              Open
            </button>
            <button type="button" onClick={() => this.handleFilter('closed')}>
              Close
            </button>
          </div>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.author}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <ButtonPage>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span>Pagina {page}</span>
          <button type="button" onClick={() => this.handlePage('next')}>
            Proximo
          </button>
        </ButtonPage>
      </Container>
    );
  }
}

export default Repository;
