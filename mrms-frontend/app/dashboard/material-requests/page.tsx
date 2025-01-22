'use client';

import '@mantine/core/styles.css';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import * as yup from 'yup';
import {
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { useUserStore } from '@/store/userStore';
import axiosInstance from '@/utils/axiosInstance';

// Types
interface MaterialRequest {
  id: number;
  requestedBy: string;
  approvalBy: string;
  status: string;
  items: Item[];
}

interface Item {
  name: string;
  quantity: number;
  description: string;
}

// Yup Schema
const addMaterialSchema = yup.object().shape({
  requestedBy: yup.string().required('Requested By is required'),
  status: yup.string().required('Status is required'),
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Item name is required'),
        quantity: yup
          .number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required'),
        description: yup.string().required('Description is required'),
      })
    )
    .min(1, 'At least one item is required'),
});

const MaterialRequests = () => {
  const [materialData, setMaterialData] = useState<MaterialRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsCount, { increment, decrement, reset }] = useCounter(1, { min: 1 });
  const { user, fetchUser } = useUserStore();

  const [openedAddModal, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [openedViewModal, { open: openView, close: closeView }] = useDisclosure(false);
  const [openedDeleteModal, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [openedApprovalModal, { open: openApproval, close: closeApproval }] = useDisclosure(false);

  const [selectedMaterialRequest, setSelectedMaterialRequest] = useState<MaterialRequest | null>(
    null
  );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/material-requests');
      setMaterialData(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  const addMaterialForm = useForm<{
    requestedBy: string;
    status: string;
    items: Item[];
  }>({
    initialValues: {
      requestedBy: '',
      status: 'PENDING',
      items: [{ name: '', quantity: 1, description: '' }],
    },
    validate: (values) => {
      try {
        addMaterialSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (e: any) {
        return e.inner.reduce(
          (errors: Record<string, string>, error: any) => ({
            ...errors,
            [error.path]: error.message,
          }),
          {}
        );
      }
    },
  });

  // HANDLE SUBMIT
  const handleAdd = async (values: { requestedBy: string; status: string; items: Item[] }) => {
    console.log(values);
    try {
      await axiosInstance.post('/material-requests', values);
      fetchData();
      close();
    } catch (err) {
      setError('Failed to add data.');
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedMaterialRequest) return;

    try {
      await axiosInstance.delete(`/material-requests/${selectedMaterialRequest.id}`);
      setMaterialData((prevData) =>
        prevData.filter((item) => item.id !== selectedMaterialRequest.id)
      );
      closeDelete();
    } catch (err) {
      setError('Failed to delete the material request.');
    }
  };

  // HANDLE OPEN
  const handleOpenView = (id: number) => {
    const request = materialData.find((item) => item.id === id);
    setSelectedMaterialRequest(request || null);
    console.log();
    openView();
  };

  const handleOpenApproval = (id: number) => {
    const request = materialData.find((item) => item.id === id);
    setSelectedMaterialRequest(request || null);
    openApproval();
  };

  const handleOpenDelete = (id: number) => {
    const request = materialData.find((item) => item.id === id);
    setSelectedMaterialRequest(request || null);
    openDelete();
  };

  const items = Array.from({ length: itemsCount }, (_, index) => (
    <Flex direction={'column'} key={index} gap="xs" w={'100%'}>
      <Group>
        <TextInput
          label={`Item ${index + 1} Name`}
          placeholder="Item Name"
          {...addMaterialForm.getInputProps(`items.${index}.name`)}
        />
        <TextInput
          label={`Item ${index + 1} Quantity`}
          placeholder="Quantity"
          type="number"
          {...addMaterialForm.getInputProps(`items.${index}.quantity`)}
        />
      </Group>
      <Textarea
        label={`Item ${index + 1} Description`}
        placeholder="Description"
        autosize
        minRows={2}
        {...addMaterialForm.getInputProps(`items.${index}.description`)}
      />
    </Flex>
  ));

  const columns = useMemo<MRT_ColumnDef<MaterialRequest>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'requestedBy',
        header: 'Requested By',
      },
      {
        accessorKey: 'approvalBy',
        header: 'Approval By',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        enableHiding: false,
        Cell: ({ row }) => (
          <Group>
            <Button size="xs" color="green" onClick={() => handleOpenView(row.original.id)}>
              View
            </Button>
            {user?.department === 'Warehouse' && (
              <Button size="xs" onClick={() => handleOpenApproval(row.original.id)}>
                Approval
              </Button>
            )}
            {user?.department === 'Production' && (
              <Button size="xs" color="red" onClick={() => handleOpenDelete(row.original.id)}>
                Delete
              </Button>
            )}
          </Group>
        ),
      },
    ],
    [user]
  );

  return (
    <div>
      <Title order={2}>Material Requests</Title>
      {loading ? (
        <Loader color="blue" size="lg" />
      ) : error ? (
        <Text color="">{error}</Text>
      ) : (
        <>
          {user?.department === 'Production' && (
            <Button onClick={openAdd} my="md">
              Add Material Request
            </Button>
          )}
          <MantineReactTable columns={columns} data={materialData} />
        </>
      )}

      {/* Modal Add */}
      <Modal opened={openedAddModal} onClose={closeAdd} title="Add Material Request">
        <form onSubmit={addMaterialForm.onSubmit(handleAdd)}>
          <Flex direction="column" gap="md">
            <TextInput
              label="Requested By"
              placeholder="Requested By"
              {...addMaterialForm.getInputProps('requestedBy')}
              value={user?.email}
              readOnly
            />
            <TextInput
              label="Status"
              placeholder="Status"
              {...addMaterialForm.getInputProps('status')}
              readOnly
            />
            <Flex direction="column" gap="md">
              <Title order={5}>Items</Title>
              <Group>
                <Button
                  size="xs"
                  onClick={() => {
                    addMaterialForm.insertListItem('items', {
                      name: '',
                      quantity: 1,
                      description: '',
                    });
                    increment();
                  }}
                >
                  Add Item
                </Button>
                <Button
                  size="xs"
                  onClick={() => {
                    if (itemsCount > 1) {
                      addMaterialForm.removeListItem('items', itemsCount - 1);
                      decrement();
                    }
                  }}
                >
                  Remove Item
                </Button>
                <Button size="xs" onClick={() => reset()}>
                  Reset
                </Button>
              </Group>
              {items}
            </Flex>
          </Flex>
          <Group justify="flex-end" mt="lg">
            <Button onClick={closeAdd} color="red">
              Cancel
            </Button>
            <Button type="submit" color="green">
              Add
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Modal View */}
      <Modal opened={openedViewModal} onClose={closeView} title="View Material Request">
        {selectedMaterialRequest && (
          <Flex direction="column" gap="md">
            <Text>ID: {selectedMaterialRequest.id}</Text>
            <Text>Requested By: {selectedMaterialRequest.requestedBy}</Text>
            <Text>Approval By: {selectedMaterialRequest.approvalBy}</Text>
            <Text>Status: {selectedMaterialRequest.status}</Text>
            <Title order={5}>Items</Title>
            {selectedMaterialRequest?.items?.length ? (
              selectedMaterialRequest.items.map((item, index) => (
                <Flex direction={'column'} key={index} gap="xs" w={'100%'}>
                  <TextInput label={`Item ${index + 1} Name`} value={item.name || ''} readOnly />
                  <TextInput
                    label={`Item ${index + 1} Quantity`}
                    value={item.quantity || 0}
                    readOnly
                  />
                  <Textarea
                    label={`Item ${index + 1} Description`}
                    value={item.description || ''}
                    readOnly
                  />
                </Flex>
              ))
            ) : (
              <Text>No items available</Text>
            )}
          </Flex>
        )}
        <Group justify="flex-end" mt="lg">
          <Button onClick={closeView} color="red">
            Close
          </Button>
        </Group>
      </Modal>

      {/* Modal Approval */}
      <Modal opened={openedApprovalModal} onClose={closeApproval} title="Approval Material Request">
        {selectedMaterialRequest && (
          <Flex direction="column" gap="md">
            <Text>ID: {selectedMaterialRequest.id}</Text>
            <Text>Requested By: {selectedMaterialRequest.requestedBy}</Text>
            <Text>Status: {selectedMaterialRequest.status}</Text>
          </Flex>
        )}
        <Group justify="flex-end" mt="lg">
          <Button onClick={closeApproval} color="red">
            Cancel
          </Button>
          <Button type="submit" color="green">
            Submit
          </Button>
        </Group>
      </Modal>

      {/* Modal Delete */}
      <Modal opened={openedDeleteModal} onClose={closeDelete} title="Delete Material Request">
        {selectedMaterialRequest && (
          <Text>
            Are you sure you want to delete Material Request ID {selectedMaterialRequest.id}?
          </Text>
        )}
        <Group justify="flex-end" mt="lg">
          <Button onClick={closeDelete}>Cancel</Button>
          <Button type="submit" color="red" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default MaterialRequests;
