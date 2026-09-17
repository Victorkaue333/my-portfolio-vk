/* Todas as telas em pt-PT. */
import certificados from './certificados';
import common from './common';
import contato from './contato';
import home from './home';
import layout from './layout';
import naoEncontrado from './naoEncontrado';
import projetoDetalhe from './projetoDetalhe';
import projetos from './projetos';
import seo from './seo';
import servicos from './servicos';
import sobre from './sobre';
import uses from './uses';

export default {
  ...layout,
  ...common,
  ...home,
  ...sobre,
  ...projetos,
  ...projetoDetalhe,
  ...servicos,
  ...certificados,
  ...contato,
  ...uses,
  ...naoEncontrado,
  ...seo,
};
