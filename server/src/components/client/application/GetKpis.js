/**
 * @param {object} params
 * @param {import('../infrastructure/KpiRepository').default} params.kpiRepository
 * @returns {() => Promise.<object>}
 */
export default ({ kpiRepository }) => async () => {
  const kpis = await kpiRepository.getKpis()
  return kpis
}
