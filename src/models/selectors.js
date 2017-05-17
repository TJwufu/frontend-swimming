export default function poolSelector(state, poolId) {
  const item = state.dataSource.find(item => item.id === poolId);
  return item;
}
